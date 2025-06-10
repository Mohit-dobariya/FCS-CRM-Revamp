import React, { useState, useEffect, useRef } from 'react';
import CustomTable from 'components/Table';
import { AuthService } from 'services';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import { Button } from 'antd';
import MainCard from 'components/MainCard';
import { Chip, MenuItem, Select, Switch } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [status, setStatus] = useState('1');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 250,
    total: 0,
    pageSizeOptions: ['250', '500', '1000', '1500'],
    showSizeChanger: true
  });
  const [sorting, setSorting] = useState({
    field: 'name',
    order: 'asc'
  });
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const debouncedSearch = useRef(
    debounce((value) => {
      setSearch(value);
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 500)
  ).current;

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, sorting, filters, search, status]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current,
        limit: pagination.pageSize,
        order: sorting.field,
        desc: sorting.order === 'descend',
        search,
        status: status,
        filters: JSON.stringify(filters)
      };
      const response = await AuthService.axiosPrivatePost('adminsList', params);
      const newData = response.data.data.data || [];
      const serverTotal = response.data.data.pagination?.totalRecords || 0;

      setData(newData);
      setPagination((prev) => ({
        ...prev,
        total: serverTotal > 0 ? serverTotal : newData.length
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]); // Reset data on error
      setPagination((prev) => ({ ...prev, total: 0 }));
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchChange = async (record) => {
    try {
      const checked = record.is_access_meetings_module == 1 ? 0 : 1;

      const params = {
        admin_id: String(record.admin_id),
        is_access_meetings_module: String(checked)
      };

      const response = await AuthService.axiosPrivatePost('updateMeetingsModuleAccessForAdmin', params);

      if (response.data.status) {
        setData((prevData) =>
          prevData.map((item) => (item.admin_id === record.admin_id ? { ...item, is_access_meetings_module: checked } : item))
        );
        enqueueSnackbar(response.data.message, {
          variant: 'success',
          anchorOrigin: { horizontal: 'center', vertical: 'top' }
        });
      } else {
        enqueueSnackbar(response.data.message, {
          variant: 'error',
          anchorOrigin: { horizontal: 'center', vertical: 'top' }
        });
      }
    } catch (error) {
      console.error('Error updating meeting access:', error);
    }
  };

  const handleGlobalSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setLoading(true);
    debouncedSearch(value);
  };

  const handleTableChange = (newPagination, newFilters, sorter) => {
    setLoading(true);
    const allowedFilterFields = ['username', 'name', 'email', 'department', 'admin_job_title'];

    const filteredOnlyAllowed = Object.keys(newFilters)
      .filter((key) => allowedFilterFields.includes(key))
      .reduce((obj, key) => {
        const value = newFilters[key];

        if (Array.isArray(value)) {
          obj[key] = value.length === 1 ? value[0] : value;
        } else {
          obj[key] = value;
        }

        return obj;
      }, {});

    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
      total: newPagination.total || pagination.total
    });

    console.log(sorter);

    setSorting({
      field: sorter.field || 'name',
      order: sorter.order || 'asc'
    });

    setFilters(filteredOnlyAllowed);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
      setSelectedRows(rows);
    }
  };

  const columns = [
    {
      title: 'ID',
      key: 'admin_id',
      render: (_, record, table) => table + 1,
      sorter: false
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      searchable: true
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      searchable: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      searchable: true,
      sorter: true
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      searchable: true,
      sorter: true
    },
    {
      title: 'Admin Job Title',
      dataIndex: 'admin_job_title',
      key: 'admin_job_title',
      searchable: true,
      sorter: true
    },
    {
      title: 'Contract',
      key: 'contract',
      sorter: false,
      render: (_, record) => <Button>Contract</Button>
    },
    {
      title: 'Meetings Module',
      key: 'meeting_module',
      sorter: false,
      render: (_, record) => (
        <Switch size="large" checked={record.is_access_meetings_module == 1} onChange={() => handleSwitchChange(record)} />
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: (_, record) =>
        record.status == 1 ? <Chip label="Active" color="success" size="small" /> : <Chip label="Inactive" color="error" size="small" />
    },
    {
      title: 'Action',
      key: 'action',
      sorter: false,
      render: (_, record) => (
        <>
          <Button>Edit</Button>
          <Button>VIEW</Button>
          <Button>DELETE</Button>
        </>
      )
    }
  ];

  return (
    <>
      <MainCard title={`Manage Office Admins List`}>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Input
            placeholder="Global Search"
            prefix={<SearchOutlined />}
            onChange={handleGlobalSearch}
            value={searchInput}
            style={{ width: 300 }}
          />
          <div>
            <Select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'Status Filter' }}
              disabled={loading}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value={'1'}>Active</MenuItem>
              <MenuItem value={'0'}>Inactive</MenuItem>
            </Select>
          </div>
        </div>
        <CustomTable
          columns={columns}
          data={data}
          loading={loading}
          rowKey={(record) => record.admin_id}
          tableName="StudentTable"
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total, range) => (
              <div>
                Showing {range[0]} to {range[1]} of {total} entries.
              </div>
            )
          }}
          onChange={handleTableChange}
          searchText={search}
          filteredKeys={filters}
          rowSelection={rowSelection}
        />
      </MainCard>
    </>
  );
};

export default DataTable;

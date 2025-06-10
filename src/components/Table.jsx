import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Table, Input, Skeleton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useVT } from 'virtualizedtableforantd4';

const CustomTable = (props) => {
  const {
    columns = [],
    data,
    tableName,
    pagination,
    onChange,
    searchText,
    filteredKeys,
    scrollConfig = { y: 600, x: 'max-content' },
    rowSelection,
    rowKey,
    loading
  } = props;

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const inputRefs = useRef({});
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Modified debounce to prevent dropdown closing during typing
  const handleSearchChange = useCallback(
    (e, setSelectedKeys, confirm) => {
      const value = e.target.value;
      setSelectedKeys(value ? [value] : []);

      // Clear any existing timeout
      if (typingTimeout) clearTimeout(typingTimeout);

      // Only confirm after typing stops for 500ms
      const timeout = setTimeout(() => {
        confirm({ closeDropdown: false });
      }, 500);

      setTypingTimeout(timeout);
    },
    [typingTimeout]
  );

  useEffect(() => {
    const updateDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [typingTimeout]);

  // Memoized and optimized columns processing
  const processedColumns = useMemo(() => {
    return columns.map((column = {}) => {
      const isSearchable = column.searchable === true;
      const dataIndex = column.dataIndex || column.key;

      const columnConfig = {
        ...column,
        filterDropdown: isSearchable
          ? ({ setSelectedKeys, selectedKeys, confirm, close, visible }) => {
              useEffect(() => {
                if (visible && inputRefs.current[dataIndex]) {
                  setTimeout(() => {
                    inputRefs.current[dataIndex].focus();
                  }, 0);
                }
              }, [visible]);
              return (
                <div style={{ padding: 8 }}>
                  <Input
                    ref={(node) => {
                      if (node) inputRefs.current[dataIndex] = node;
                    }}
                    placeholder={`Search ${column.title || ''}`}
                    value={selectedKeys?.[0]}
                    onChange={(e) => handleSearchChange(e, setSelectedKeys, confirm)}
                    onPressEnter={() => {
                      confirm({ closeDropdown: false });
                      if (typingTimeout) clearTimeout(typingTimeout);
                    }}
                    allowClear
                    onClear={close}
                  />
                </div>
              );
            }
          : undefined,
        filterIcon: isSearchable ? (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} /> : undefined,

        render: column.render
          ? column.render
          : (text) => {
              const columnSearchText = dataIndex && filteredKeys?.[dataIndex];
              const highlightText =
                typeof columnSearchText === 'string' ? columnSearchText : typeof searchText === 'string' ? searchText : '';
              return (
                <Highlighter
                  highlightStyle={{ backgroundColor: '#ffeb3b', padding: 0 }}
                  searchWords={[highlightText].filter(Boolean)}
                  autoEscape
                  textToHighlight={String(text ?? '')}
                />
              );
            }
      };
      return columnConfig;
    });
  }, [columns, searchText, filteredKeys, handleSearchChange, typingTimeout]);

  const scroll = useMemo(
    () => ({
      ...scrollConfig,
      y: height <= 900 ? 500 : 550,
      x: width <= 1440 ? '180vw' : '110vw'
    }),
    [width, height, scrollConfig]
  );

  const handleTableChange = useCallback(
    (pagination, filters, sorter) => {
      onChange?.(pagination, filters, sorter);
    },
    [onChange]
  );

  const [vt] = useVT(() => ({ scroll: { y: scroll.y }, overscanRowCount: 20 }), [scroll.y]);

  const skeletonRowCount = 10;
  const tableComponents = useMemo(() => {
    return {
      ...vt,
      body: {
        wrapper: ({ children, ...restProps }) => (
          <tbody {...restProps}>
            {loading
              ? // When loading, render skeleton rows
                Array.from({ length: skeletonRowCount }).map((_, idx) => (
                  <tr key={`skeleton-${idx}`}>
                    {/* Use a unique key for skeleton rows */}
                    {processedColumns.map((col, colIdx) => (
                      <td key={`skeleton-${idx}-${colIdx}`} style={col.width ? { width: col.width } : {}}>
                        {/* Optional: apply column width to skeleton cells */}
                        <Skeleton active paragraph={false} title={{ width: '80%' }} /> {/* Adjust skeleton appearance */}
                      </td>
                    ))}
                  </tr>
                ))
              : // When not loading, render the actual table rows
                children}
          </tbody>
        )
      }
    };
  }, [loading, vt, processedColumns]);

  // Data memoization: Always pass the actual data, loading state is handled by components
  const tableData = useMemo(() => {
    return data || [];
  }, [data]);

  return (
    <Table
      columns={processedColumns}
      dataSource={tableData}
      rowKey={rowKey}
      rowSelection={rowSelection}
      onChange={handleTableChange}
      pagination={pagination}
      scroll={scroll}
      className={tableName}
      components={tableComponents}
      bordered
      size="middle"
    />
  );
};

export default CustomTable;

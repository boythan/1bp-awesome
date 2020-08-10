import React, { Component } from "react";
import { Table, Input, Button, Icon } from "antd";
import PropTypes from "prop-types";
import TableAwesomeStyle from "./TableAwesomeStyle";
import { isArray, isString } from "./TableAwesomeUtils";
import _ from "lodash";
import Highlighter from "react-highlight-words";
import "./TableAwesome.css";
const INIT_PAGNITION = {
  current: 1,
  showSizeChanger: false,
  showQuickJumper: true,
  showTotal: (total) => (
    <div className={"captionText"}>{`Total ${total} items`}</div>
  ),
};
class TableAwesomeComponent extends Component {
  static propTypes = {
    containerStyle: PropTypes.object,
    tableStyle: PropTypes.object,

    source: PropTypes.func,
    rowKey: PropTypes.func,
    transformer: PropTypes.func,
    renderFooter: PropTypes.func,

    isScroll: PropTypes.bool,
    columns: PropTypes.array.isRequired,
    isPagination: PropTypes.object,
  };

  static defaultProps = {
    rowKey: (item) => {
      if (item.id) {
        return item.id;
      }

      if (isString(item)) return item;
    },
    source: Promise.resolve([]),
    transformer: (response) => {
      return response;
    },

    containerStyle: TableAwesomeStyle.containerTableStyle,
    tableStyle: TableAwesomeStyle.tableStyle,

    columns: [],
    isPagination: true,
    isScroll: true,

    tableClassName: "",
    classNameContainer: "",
    // renderFooter: ()=> { return false}
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      currentDataSource: [],
      loading: true,
      refreshing: false,
      total: 0,

      searchText: "",
      searchedColumn: "",

      filteredInfo: null,
      sortedInfo: null,

      pagination: props.isPagination ? INIT_PAGNITION : false,
    };
  }

  componentDidMount() {
    this.start();
  }

  componentWillMount() {
    this._unmounted = false;
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  /****************************************************HANDLE SEARCH FUNCTION ****************************************************/

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      return (
        record?.[dataIndex]
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase()) ?? false
      );
    },

    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  /**************************************************** TABLE CONTROL ****************************************************/

  start() {
    const { source, transformer } = this.props;
    const { pagination } = this.state;

    source(pagination.current)
      .then((response) => {
        let data = transformer(response);
        let pagination = response?.data?.data?.pagination ?? 0;
        if (!isArray(data)) {
          throw "Data is not an array";
          return;
        }

        if (_.isEmpty(data) && this.state.data.length == 0) {
          this.setState({
            data: [],
            currentDataSource: [],
            refreshing: false,
            loading: false,
          });
          return;
        }

        this.setState({
          currentDataSource: data,
          data: data,
          refreshing: false,
          loading: false,
          total: response?.data?.data?.pagination?.items ?? 0,
        });
      })
      .catch((error) => {
        if (this._unmounted) return;
        this.setState({ loading: false, refreshing: false });
      });
  }

  refresh() {
    this.setState(
      {
        loading: true,
        refreshing: true,
        filteredInfo: null,
        sortedInfo: null,
        pagination: this.props.isPagination ? INIT_PAGNITION : false,
      },
      () => this.start()
    );
  }

  refreshData() {
    this.setState(
      {
        loading: true,
        refreshing: true,
        filteredInfo: null,
        sortedInfo: null,
      },
      () => this.start()
    );
  }

  handleTableChange = (pagination, filters, sorter, extra) => {
    const { current } = pagination;
    this.setState({ pagination: { ...this.state.pagination, current } }, () =>
      this.start()
    );
  };

  /**************************************************** RENDER ****************************************************/

  render() {
    const { filteredInfo, total, pagination } = this.state;

    const {
      columns,
      rowKey,
      isPagination,
      renderFooter,
      isScroll,
      tableClassName,
      classNameContainer
    } = this.props;

    const columnsResult = columns.map((columnParams) => {
      let column = columnParams;
      if (column.filters && column.filters.length > 0) {
        column = {
          ...column,
          filteredValue:
            filteredInfo && column.dataIndex
              ? filteredInfo[column.dataIndex]
              : null,
        };
      }

      if (column.isSearch) {
        column = {
          ...column,
          ...this.getColumnSearchProps(column.dataIndex),
        };
      }
      return column;
    });

    const paginationResult = pagination ? { ...pagination, total } : false;
    return (
      <div
        style={styles.mainContainer}
        className={"tableAwesomeComponent " + classNameContainer}
      >
        <Table
          {...this.props}
          columns={columnsResult}
          rowKey={rowKey}
          dataSource={this.state.data}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          rowClassName={(record, index) => {
            return "rowAwesomeTable";
          }}
          className={`tableAwesome ${tableClassName}`}
          pagination={paginationResult}
          scroll={isScroll ? { y: 500 } : {}}
          // handlePageChange
        />
      </div>
    );
  }
}

export default TableAwesomeComponent;

const styles = {
  mainContainer: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 0,
    width: "100%",
  },
  controlContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },
};

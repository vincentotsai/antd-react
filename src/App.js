import React, { Component } from 'react';
import { Modal, Button, Input, Table, Icon, Popconfirm, Rate } from 'antd';
import './App.css';

const Search = Input.Search;

class EditableCell extends Component {
  // constructor(){
  //   return Object
  // }
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

console.log(EditableCell.constructor())

class App extends Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'name')}
        />
      ),
    }, {
      title: 'Year',
      dataIndex: 'year',
      width: '20%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'year')}
        />
      ),
    }, {
      title: 'Grape',
      dataIndex: 'grape',
      width: '20%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'grape')}
        />
      ),
    }, {
      title: 'Rating',
      dataIndex: 'rating',
      width: '20%',
      // render: (text, record, index) => {
      //   return (
      //   <Rate onChange= { this.handleChange } value= { value } />
      //   );
      // },
    }, {
  title: 'Actions',
    dataIndex: 'actions',
      render: (text, record, index) => {
        return (
          this.state.dataSource.length >= 1 ?
            (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
                <a href="#">Delete</a>
              </Popconfirm>
            ) : null
        );
      },
    }];

this.state = {
  dataSource: [{
    key: '0',
    name: 'Edward $0',
    year: '2017',
    grape: 'enen',
    rating: '5',
  }, {
    key: '1',
    name: 'Qidian 09',
    year: '2016',
    grape: 'meme',
    rating: '4',
  }],
  count: 2,
};
  }
onCellChange = (index, key) => {
  return (value) => {
    const dataSource = [...this.state.dataSource];
    dataSource[index][key] = value;
    this.setState({ dataSource });
  };
}
onDelete = (index) => {
  const dataSource = [...this.state.dataSource];
  dataSource.splice(index, 1);
  this.setState({ dataSource });
}
handleAdd = () => {
  const { count, dataSource } = this.state;
  const newData = {
    key: count,
    name: `Wang ${count}`,
    year: 2017,
    grape: `grapee ${count}`,
    rating: 4,
  };
  this.setState({
    dataSource: [...dataSource, newData],
    count: count + 1,
  });
}
//
state = { visible: false }
showModal = () => {
  this.setState({
    visible: true,
  });
}
handleOk = (e) => {
  console.log(e);
  this.setState({
    visible: false,
  });
}
handleCancel = (e) => {
  console.log(e);
  this.setState({
    visible: false,
  });
}
render() {
  const { dataSource } = this.state;
  const columns = this.columns;
  return (
    <div className="App">
      <div className="App-header">Admin</div>
      <div>
        {/*<Button type="primary" onClick={this.showModal}>+add</Button>*/}
        <Modal
          title="Add new item"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <label>Name:<Input /></label>
          <label>Year:<Input type="number" /></label>
          <label>Grape:<Input /></label>
        </Modal>
        <div className="search">
          <Search
            placeholder="search"
            style={{ width: 200 }}
            onSearch={value => console.log(value)}
          />
        </div>

        <Button className="editable-add-btn" type="primary" onClick={this.handleAdd}>+Add</Button>
        <Table bordered dataSource={dataSource} columns={columns} />

      </div>
    </div>
  );
}
}

export default App;

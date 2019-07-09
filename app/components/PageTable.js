import React from 'react'
import Search from 'antd/lib/input/Search'
import Table from 'antd/lib/table'

function filter(data, params, text) {
  return data.filter(e => {
    for (const p of params) {
      if (
        e[p] &&
        String(e[p])
          .toLowerCase()
          .includes(String(text).toLowerCase())
      )
        return true
    }
    return false
  })
}

export class PageTable extends React.Component {
  state = { q: '' }
  render() {
    const { columns, data, filterParams = ['_id'], ...props } = this.props
    return (
      <div>
        <div
          className="top-control"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            display: 'table',
            width: '100%'
          }}
        >
          <div
            style={{
              flex: 1
            }}
          />
          {/* <b>Search</b> */}
          <Search
            placeholder="Search"
            style={{ margin: '10px 20px', width: 'auto', float: 'right' }}
            onChange={e => this.setState({ q: e.target.value })}
          />
        </div>
        <Table
          columns={columns.map(e => ({ key: e.dataIndex, ...e }))}
          dataSource={filter(data, filterParams, this.state.q).map((e, i) => ({
            key: `${i}`,
            ...e
          }))}
          {...props}
        />
      </div>
    )
  }
}

import React from 'react'
import { connect } from 'react-redux'
import StockPage from './StockPage'
import StockList from './StockList'
import TableCell from './TableCell'
import { Table, Grid, Container } from 'semantic-ui-react'
import { v4 } from 'uuid'


class ProfilePage extends React.Component {

  state = {
    data: null
  }

  componentDidMount() {
    fetch(`http://localhost:3000/portfolio`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify({userId: this.props.currentUser.id})
		})
    .then( r => r.json())
    .then( r => {
      this.props.setPortfolio(r)
      this.setState({
        data: r
      })
    })
  }

  renderTransactions = () => {
    // debugger
    return this.props.currentUser.stocks.map(stock => {
      return <StockList key={ v4() } stock={stock}/>
    })
  }

  renderTableData = () => {
    if(this.props.portfolio){
      return this.props.portfolio.map( obj => {
        return <TableCell key={ v4() } stock={obj} />
      })
    } else {
      return null
    }
  }

  renderPortfolioValue = () => {
    let total = 0
    if(this.state.data) {
      this.state.data.forEach(obj => total += obj.total_market_val)
    }

    return total + this.props.currentUser.cash_value
  }





  render() {
    console.log(this.props)
    return (
      <Container>
        <br/>
        <Container>
        <h2>Username: {this.props.currentUser.username}</h2>
        <h4>{this.props.currentUser.first_name}  {this.props.currentUser.last_name}</h4>
        <p>Portfolio Value</p>
        { this.props.currentUser ? this.renderPortfolioValue() : null}
        <p>Portfolio Value represents the total value of all the holdings in your account, including cash.</p>
        </Container>

        <StockPage data={this.state.data}/>

        <br/><br/><br/>
        <Container>
        <Table inverted>
          <Table.Header >
          <Table.Row>
            <Table.HeaderCell>Current Holding</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Company</Table.HeaderCell>
              <Table.HeaderCell>Symbol</Table.HeaderCell>
              <Table.HeaderCell>Stocks You Own</Table.HeaderCell>
              <Table.HeaderCell>Market Price</Table.HeaderCell>
              <Table.HeaderCell>Your Avg Price</Table.HeaderCell>
              <Table.HeaderCell>Market Total</Table.HeaderCell>
              <Table.HeaderCell>Percent Gain/Loss</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.renderTableData() }
          </Table.Body>
        </Table>
        </Container>


        <br/><br/><br/>


        {this.props.currentUser ?
          <Container>

            <Table inverted>
              <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Transaction History</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Stock Company</Table.HeaderCell>
                <Table.HeaderCell>Symbol</Table.HeaderCell>
                <Table.HeaderCell>Price at Purchase</Table.HeaderCell>
                <Table.HeaderCell>Trade Type</Table.HeaderCell>
                <Table.HeaderCell>Purchase/Sell Date</Table.HeaderCell>
                <Table.HeaderCell>Quantity Purchased/Sold</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

            <Table.Body>
            { this.renderTransactions() }
            </Table.Body>
            </Table>
          </Container>
          : null}
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentStock: state.currentStock,
    portfolio: state.portfolio
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPortfolio: (portfolio) => {
      dispatch({
        type: "SET_PORTFOLIO",
        payload: portfolio
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

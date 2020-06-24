import React from 'react';
import '../css/App.css';
import AddAppointment from  './AddAppointments'
import SearchAppointment from  './SearchAppointments'
import ListAppointment from  './ListAppointments'
import { findIndex , without } from 'lodash'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      lastIndex : 0,
      displayForm: false,
      orderBy: 'petName',
      orderDir: 'ASC',
      queryText: ''
    }
    this.deleteAppointment = this.deleteAppointment.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
    this.addAppointment = this.addAppointment.bind(this)
    this.changeOrder = this.changeOrder.bind(this)
    this.searchApts = this.searchApts.bind(this)
    this.updateInfo = this.updateInfo.bind(this)

  }

  changeOrder(orderBy, orderDir){
      this.setState({
          orderBy: orderBy,
          orderDir: orderDir
      })
  }
  addAppointment(apt){
      let tempApt = this.state.myAppointments
      apt.aptId = this.state.lastIndex
      tempApt.unshift(apt)
      this.setState({
          myAppointments: tempApt,
          lastIndex : this.state.lastIndex +1
      })

  }

  deleteAppointment(apt){
      let tempApt = this.state.myAppointments
      tempApt = without(tempApt, apt)
      this.setState({
          myAppointments: tempApt
      })
  }
  toggleForm(){
      this.setState({
          displayForm: !this.state.displayForm
      })
  }
  searchApts(queryText){
      this.setState({
          queryText: queryText
      })
  }
  updateInfo(name, value, id){
      let tempApt = this.state.myAppointments
      let AppIndex = findIndex(this.state.myAppointments,{
          aptId:id
      })
      tempApt[AppIndex][name] = value
      this.setState({
          myAppointments: tempApt
      })
  }
  componentDidMount() {
    fetch('./data.json')
        .then(response => response.json())
        .then(response => {
          const apts = response.map(item => {
            item.aptId = this.state.lastIndex
            this.setState({
                lastIndex: this.state.lastIndex +1
            })
            return item
          })
          this.setState({
            myAppointments: apts,
          })
        })
  }

  render() {
      let order;
      if(this.state.orderDir === 'ASC'){
          order = 1
      }else{
          order = -1
      }
      let filterdApt = this.state.myAppointments
      filterdApt = filterdApt.sort((a,b) => {
          if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()) {
              return -1 * order
          }else{
              return 1 * order
          }
      }).filter(eachItem => {

            return (
                eachItem['petName']
                    .toLowerCase()
                    .includes(this.state.queryText.toLowerCase()) ||
                eachItem['ownerName']
                    .toLowerCase()
                    .includes(this.state.queryText.toLowerCase()) ||
                eachItem['aptNotes']
                    .toLowerCase()
                    .includes(this.state.queryText.toLowerCase())
            )
      })
    return (
        <main className="page bg-white" id="petratings">
          <div className="container">
            <div className="row">
              <div className="col-md-12 bg-white">
                <div className="container">
                  <AddAppointment
                      addAppointment={this.addAppointment}
                      toggleForm={this.toggleForm}
                      displayForm={this.state.displayForm}

                  />
                  <SearchAppointment
                      changeOrder={this.changeOrder}
                      orderBy={this.state.orderBy}
                      orderDir={this.state.orderDir}
                      searchApts={this.searchApts}
                  />
                  <ListAppointment
                      myAppointments={filterdApt}
                      deleteAppointment={this.deleteAppointment}
                      updateInfo={this.updateInfo}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
    );
  }

}

export default App;

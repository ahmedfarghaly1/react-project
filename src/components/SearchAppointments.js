import React , { Component } from 'react'

class SearchAppointments extends Component{
    render() {
            return (
                <div className="search-appointments row justify-content-center my-4">
                    <div className="col-md-6">
                        <div className="input-group">
                            <input id="SearchApts" placeholder="Search" type="text" className="form-control"
                                   aria-label="Search Appointments"
                                   onChange={e => this.props.searchApts(e.target.value)}
                            />
                                <div className="input-group-append">
                                    <button type="button" className="btn btn-primary dropdown-toggle"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort
                                        by: <span className="caret"></span>
                                    </button>

                                    <div className="sort-menu dropdown-menu dropdown-menu-right">
                                        <button className={ 'sort-by dropdown-item ' + (this.props.orderBy === 'petName' ? 'active':'') }
                                            onClick={ e => this.props.changeOrder('petName', this.props.orderDir)}
                                            >
                                            Pet Name
                                        </button>
                                        <button className={ 'sort-by dropdown-item ' + (this.props.orderBy === 'aptDate' ? 'active':'') }
                                                onClick={ e => this.props.changeOrder('aptDate', this.props.orderDir)}
                                        >
                                            Date
                                        </button>
                                        <button className={ 'sort-by dropdown-item ' + (this.props.orderBy === 'ownerName' ? 'active':'') }
                                                onClick={ e => this.props.changeOrder('ownerName', this.props.orderDir)}
                                        >
                                            Owner
                                        </button>
                                        <div role="separator" className="dropdown-divider"></div>
                                        <button className={ 'sort-dir dropdown-item ' + (this.props.orderDir === 'ASC' ? 'active':'')}
                                                onClick={ e => this.props.changeOrder(this.props.orderBy, 'ASC')}
                                        >
                                            Asc
                                        </button>
                                        <button className={ 'sort-dir dropdown-item ' + (this.props.orderDir === 'DESC' ? 'active':'')}
                                                onClick={ e => this.props.changeOrder(this.props.orderBy, 'DESC')}

                                        >
                                            Desc
                                        </button>
                                    </div>
                                </div>
                        </div>

                    </div>

                </div>
            )
    }
}

export default SearchAppointments

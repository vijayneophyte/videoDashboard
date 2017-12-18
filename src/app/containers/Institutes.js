import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getAdmins,selectedAdminData,deleteAdmin} from "../actions/index";
import Newadd from './AddContentUploader'
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';

import 'style-loader!react-confirm-alert/src/react-confirm-alert.css'
import moment from 'moment'


import {Route, Link, Switch} from 'react-router-dom';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.onDeleteAdmin = this.onDeleteAdmin.bind(this);
    }
    componentDidMount() {
        this.props.getAdmins({role:3});
    }
    selectedAdmin(admin){
        const {context,history} = this.props
        this.props.selectedAdminData(admin);
        history.push(this.props.match.url+"/"+admin.email)
    }

    onDeleteAdmin(userId,role){
        confirmAlert({
            title: 'Confirm To Delete',                        // Title dialog
            message: 'Are you sure to do this.',               // Message dialog
            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => this.props.deleteAdmin(userId,role)   // Action after Confirm
        })

    }

    render() {
        var admins = this.props.admins
        var listAdmins = admins.map(function (admin) {
            return (
                <tr key={admin._id} onClick={()=>this.selectedAdmin(admin)}>
                    <td><img src={admin.profilePic ? admin.profilePic : "https://codeuniverse.s3.ap-south-1.amazonaws.com/no_image_placeholder.png"}/></td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.phone}</td>
                    {/*<td>{admin.school ? "School" : "User"}</td>*/}
                    <td>{moment(admin.createdAt).format('LL')}</td>
                    <td>
                        <button  className="btn blackButton" onClick={(e)=>{e.stopPropagation();this.onDeleteAdmin(admin._id,{role:3})}}>Remove</button>
                    </td>
                </tr>
            );
        }, this);
        return (
            <div>
                <div>
                    <Newadd data={{title:"Add Institute",role:"3"}}/>
                    <div className="row" id="title">
                        <div className="col-sm-10" id="userslist">Institutes</div>
                        <div className="col-sm-2" >
                            <button type="button" className="btn btn-info btn-sm" data-toggle="modal"
                                    data-target="#myUserAddModal">
                                <span className="glyphicon glyphicon-plus"/> Add Institute
                            </button>
                        </div>
                    </div>
                    <div className="gridTable table-responsive">
                        <table className="table table-striped table-bordered" cellSpacing="0" width="100%">
                            <thead>
                            <tr>
                                <th>Profile Pic</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                {/*<th>Type</th>*/}
                                <th>Added At</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listAdmins }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        admins: state.User.admins,
        selectedAdmin: state.User.selectedAdmin
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAdmins: (role) => dispatch(getAdmins(role)),
        selectedAdminData: (data) => dispatch(selectedAdminData(data)),
        deleteAdmin: (adminId,role) => dispatch(deleteAdmin(adminId,role)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(User);
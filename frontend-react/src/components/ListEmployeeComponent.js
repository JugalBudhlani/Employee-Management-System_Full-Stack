import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    useEffect(() => {

        getAllEmployees();
    }, [])

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees().then((response) => {
            setEmployees(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const deleteEmployee = (employeeId) => {
       EmployeeService.deleteEmployee(employeeId).then((response) =>{
        getAllEmployees();

       }).catch(error =>{
           console.log(error);
       })
        
    }

    return (
        <div className = "container btn-u">
            <h2 className = "text-center mb-5 btn-h"> List of Employees </h2>
            
            <div class="input-group srch">
                <Link to = "/add-employee" className = "btn btn-outline-dark" > Add Employee </Link>
                <input type="search" class="form-control rounded" placeholder="Enter Employee ID" aria-label="Search" aria-describedby="search-addon" />
                <button type="button" class="btn btn-outline-dark">search</button>
            </div>
            <table className="table table-bordered table-striped table-hover tb">
                <thead>
                    <th> Employee Id </th>
                    <th> Employee First Name </th>
                    <th> Employee Last Name </th>
                    <th> Employee Email Id </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        employees.map(
                            employee =>
                            <tr key = {employee.id}> 
                                <td> {employee.id} </td>
                                <td> {employee.firstName} </td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>
                                    <Link className="button2" to={`/edit-employee/${employee.id}`} >Update</Link>
                                    <button className = "button1" onClick = {() => deleteEmployee(employee.id)}
                                    style = {{marginLeft:"10px"}}> Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent

import React from 'react'
import Item from './Item'

const StylizedTable = () => {
    let data = [
        {
            "Name": "Tiger Nixon",
            "Position": "System Architect",
            "Office": "Edinburgh",
            "Age": 61,
            "Start Date": "2011/04/25",
            "Salary": "$320,800"
        },
        {
            "Name": "Garrett Winters",
            "Position": "Accountant",
            "Office": "Tokyo",
            "Age": 63,
            "Start Date": "2011/07/25",
            "Salary": "$170,750"
        },
        {
            "Name": "Ashton Cox",
            "Position": "Junior Technical Author",
            "Office": "San Francisco",
            "Age": 66,
            "Start Date": "2009/01/12",
            "Salary": "$86,000"
        },
        {
            "Name": "Cedric Kelly",
            "Position": "Senior Javascript Developer",
            "Office": "Edinburgh",
            "Age": 22,
            "Start Date": "2012/03/29",
            "Salary": "$433,060"
        },
        {
            "Name": "Airi Satou",
            "Position": "Accountant",
            "Office": "Tokyo",
            "Age": 33,
            "Start Date": "2008/11/28",
            "Salary": "$162,700"
        },
        {
            "Name": "Brielle Williamson",
            "Position": "Integration Specialist",
            "Office": "New York",
            "Age": 61,
            "Start Date": "2012/12/02",
            "Salary": "$372,000"
        },
        {
            "Name": "Herrod Chandler",
            "Position": "Sales Assistant",
            "Office": "San Francisco",
            "Age": 59,
            "Start Date": "2012/08/06",
            "Salary": "$137,500"
        },
        {
            "Name": "Rhona Davidson",
            "Position": "Integration Specialist",
            "Office": "Tokyo",
            "Age": 55,
            "Start Date": "2010/10/14",
            "Salary": "$327,900"
        },
        {
            "Name": "Colleen Hurst",
            "Position": "Javascript Developer",
            "Office": "San Francisco",
            "Age": 39,
            "Start Date": "2009/09/15",
            "Salary": "$205,500"
        },
        {
            "Name": "Sonya Frost",
            "Position": "Software Engineer",
            "Office": "Edinburgh",
            "Age": 23,
            "Start Date": "2008/12/13",
            "Salary": "$103,600"
        },
        {
            "Name": "Jena Gaines",
            "Position": "Office Manager",
            "Office": "London",
            "Age": 30,
            "Start Date": "2008/12/19",
            "Salary": "$90,560"
        },
        {
            "Name": "Quinn Flynn",
            "Position": "Support Lead",
            "Office": "Edinburgh",
            "Age": 22,
            "Start Date": "2013/03/03",
            "Salary": "$342,000"
        },
        {
            "Name": "Charde Marshall",
            "Position": "Regional Director",
            "Office": "San Francisco",
            "Age": 36,
            "Start Date": "2008/10/16",
            "Salary": "$470,600"
        },
        {
            "Name": "Haley Kennedy",
            "Position": "Senior Marketing Designer",
            "Office": "London",
            "Age": 43,
            "Start Date": "2012/12/18",
            "Salary": "$313,500"
        },
        {
            "Name": "Tatyana Fitzpatrick",
            "Position": "Regional Director",
            "Office": "London",
            "Age": 19,
            "Start Date": "2010/03/17",
            "Salary": "$385,750"
        },
        {
            "Name": "Michael Silva",
            "Position": "Marketing Designer",
            "Office": "London",
            "Age": 66,
            "Start Date": "2012/11/27",
            "Salary": "$198,500"
        },
        {
            "Name": "Paul Byrd",
            "Position": "Chief Financial Officer (CFO)",
            "Office": "New York",
            "Age": 64,
            "Start Date": "2010/06/09",
            "Salary": "$725,000"
        },
        {
            "Name": "Gloria Little",
            "Position": "Systems Administrator",
            "Office": "New York",
            "Age": 59,
            "Start Date": "2009/04/10",
            "Salary": "$237,500"
        },
        {
            "Name": "Bradley Greer",
            "Position": "Software Engineer",
            "Office": "London",
            "Age": 41,
            "Start Date": "2012/10/13",
            "Salary": "$132,000"
        },
        {
            "Name": "Dai Rios",
            "Position": "Personnel Lead",
            "Office": "Edinburgh",
            "Age": 35,
            "Start Date": "2012/09/26",
            "Salary": "$217,500"
        },
        {
            "Name": "Jenette Caldwell",
            "Position": "Development Lead",
            "Office": "New York",
            "Age": 30,
            "Start Date": "2011/09/03",
            "Salary": "$345,000"
        },
        {
            "Name": "Yuri Berry",
            "Position": "Chief Marketing Officer (CMO)",
            "Office": "New York",
            "Age": 40,
            "Start Date": "2009/06/25",
            "Salary": "$675,000"
        },
        {
            "Name": "Caesar Vance",
            "Position": "Pre-Sales Support",
            "Office": "New York",
            "Age": 21,
            "Start Date": "2011/12/12",
            "Salary": "$106,450"
        },
        {
            "Name": "Doris Wilder",
            "Position": "Sales Assistant",
            "Office": "Sidney",
            "Age": 23,
            "Start Date": "2010/09/20",
            "Salary": "$85,600"
        },
        {
            "Name": "Angelica Ramos",
            "Position": "Chief Executive Officer (CEO)",
            "Office": "London",
            "Age": 47,
            "Start Date": "2009/10/09",
            "Salary": "$1,200,000"
        },
        {
            "Name": "Gavin Joyce",
            "Position": "Developer",
            "Office": "Edinburgh",
            "Age": 42,
            "Start Date": "2010/12/22",
            "Salary": "$92,575"
        },
        {
            "Name": "Jennifer Chang",
            "Position": "Regional Director",
            "Office": "Singapore",
            "Age": 28,
            "Start Date": "2010/11/14",
            "Salary": "$357,650"
        },
        {
            "Name": "Brenden Wagner",
            "Position": "Software Engineer",
            "Office": "San Francisco",
            "Age": 28,
            "Start Date": "2011/06/07",
            "Salary": "$206,850"
        },
        {
            "Name": "Fiona Green",
            "Position": "Chief Operating Officer (COO)",
            "Office": "San Francisco",
            "Age": 48,
            "Start Date": "2010/03/11",
            "Salary": "$850,000"
        },
        {
            "Name": "Shou Itou",
            "Position": "Regional Marketing",
            "Office": "Tokyo",
            "Age": 20,
            "Start Date": "2011/08/14",
            "Salary": "$163,000"
        }
    ]
    return (
        <div className="row py-5">
            <div className="col-lg-10 mx-auto">
                <div className="card rounded shadow border-0">
                    <div className="card-body p-5 bg-white rounded">
                        <div className="table-responsive">
                            <table id="example" style={{ "width": "100%" }} className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Office</th>
                                        <th>Age</th>
                                        <th>Start date</th>
                                        <th>Salary</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(
                                            (item, index) => {
                                                return <Item data={item} key={index} ></Item>
                                            }
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StylizedTable
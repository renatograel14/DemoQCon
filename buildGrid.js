$(document).ready(function() {

    var user = new kendo.data.Model.define({
        id: '_id',
        fields: {
            "_id" : {
                editable: false
            },
            "FirstName": {
                editable: true,
                validation: {
                    required: true
                }  
            },
            "LastName":{
                editable: true,
                validation: {
                    required: true
                }  
            },
            "Company": {
                editable: true,
                validation: {
                    required: true
                }
            },
            "quizHits": {
                type: 'number',
                editable: false
            },
            "rating": {
                type: 'number',
                editable: false
            }
        } 
    });

    var data = new kendo.data.DataSource({
        transport: {
            read: {
                url: '/user',
                type: 'get'
            },
            create: {
                url: '/user',
                type: 'post'
            },
            update: {
                url: '/user',
                type: 'put'
            },
            destroy: {
                url: '/user',
                type: 'delete'
            }
        },
        schema: {
            model: user
        },
        pageSize: 10
    });

    $("#grid").kendoGrid({
        dataSource: data,
        height: 550,
        groupable: false,
        sortable: true,
        // toolbar: ['create'],
        editable: 'inline',
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [
        { field: 'FirstName',title: "First Name"},
        { field: 'LastName', title: "Last Name"},
        { field: "quizHits", title: "Right Answers"},
        { field: 'rating', title: "Rating"}/*,
        { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }*/
        ]
    });
});
$(function() {

    $('#createContact').on('click', displayControl);
    $('#searchContacts').on('click', displayControl);
    $('#specificContact').on('click', displayControl);
    $('#listContacts').on('click', displayControl);
    $('#createSubmit').on('click', createContact);
    $('#searchSubmit').on('click', submitSearch);
    $('#displayRecordButton').on('click', getRecord);

    function prepareResultsArea() {
        $("#results").empty();
        $("#results").show();
    }

    function displayContact(contact) {
        $("<div class ='well'>").append("<strong>Name: </strong>" + contact.first_name + ' ' + contact.last_name + "<br> <strong>Email: </strong> " + contact.email + "<br> <strong>Phone: </strong> " + contact.phone_number).appendTo("#results")
    }

    function listContacts() {
        prepareResultsArea();
        $("<h3> All Contacts </h3>").appendTo("#results");
        $.getJSON("/contacts", function(contacts) {
            $.each(contacts, function(idx, contact) {
                displayContact(contact);
            });
        });
    }

    function successCreate(data) {
        prepareResultsArea();
        $("<p>").append("Contact Created! Response message: " + data.result ).appendTo("#results");
    }

    function createContact() {
        var firstName = $('#first_name').val();
        var lastName = $('#last_name').val();
        var email = $('#email').val();
        var phoneNumber = $('#phone_num').val();
        $.post( "/contacts/new", {first_name: firstName, last_name: lastName, email: email, phone_number: phoneNumber}, successCreate, "json" )
    }

    function submitSearch() {
        prepareResultsArea();
        $("<h3> Search Results </h3>").appendTo("#results");

        var query = $('#query').val();
        $.getJSON("/contacts/search?query=" + query, function(contacts) {
            if (contacts.length == 0) {
                $("<p> No Records Found </p>").appendTo("#results");
            } else {
                $.each(contacts, function(idx, contact) {
                    displayContact(contact);
                });
            }
        });
    }

    function getRecord() {
        prepareResultsArea();
        $("<h3> Contact Details </h3>").appendTo("#results");

        var idNumber = $('#idSearch').val();
        $.getJSON("/contacts/" + idNumber, function(contact) {
            displayContact(contact);
        });
    }

    function displayControl(){
        $("#controlArea").children().hide();

        $("#results").hide();
        if ($(this).data('target') === 'listFunction') {
            listContacts();
        } else {
            $('#' + $(this).data('target')).show();
        }
    }


});
// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateFields();
    
    // Update IPtabels Settings button click
    $('#BtnUpdateNMCSettings').on('click', UpdateNMCSettings);
    $('#BtnRestartNMCService').on('click', RestartNMCService);

});

// Functions =============================================================

// Fill table with data
function populateFields() {
    // jQuery AJAX call for JSON
    $.getJSON( '/admin/namecoin/getsettings', function( data ) {
        //console.log('---------firewall Settings-----------');
        console.log(data);

        //Set Namecoin Service settings
        /*if ( data.EnableTorGateway === '' ) {
            $( "#rpc_user" ).prop( "checked", true );
        } else if ( data.EnableTorGateway === '# ' ) {
            $( "#enable_tor_gateway" ).prop( "checked", false );
        }*/
        $( "#rpc_user" ).val( data[0].rpcuser );
        $( "#rpc_pass" ).val( data[0].rpcpass );
    });
};


// Update Namecoin Settings
function UpdateNMCSettings() {

    /*App.loader('show');
    setTimeout(function () {
        App.loader('hide');
    }, 3000);*/

    var TorSettings = {
            'enable_tor_gateway': $('#enable_tor_gateway').is(':checked')
        }


    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: TorSettings,
        url: '/admin/namecoin/update',
        dataType: 'html',
        success: function(data, textStatus, jqXHR) {
            var NMCData = JSON.parse(data);
            console.log(NMCData);

            if (NMCData.msg === 'success') {
                console.log('Success');
                swal("Success", "Tor Settings Saved.", "success");

                populateFields();
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                swal("Oops...", "Something went wrong!", "error");
            }
        },
        error: function(xhr, textStatus, error) {
            console.log('failure');
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
            swal("Oops...", "Something went wrong!", "error");
            
        }
    });
    
};

function RestartNMCService() {
    console.log('==> Restarting Namecoin Service...');
    $.getJSON( '/admin/namecoin/restartnmc', function( data ) {
        console.log(data);
        if (data.msg === 'success') {
            console.log('Success');
            swal("Success", "Namecoin Service Restarted.", "success");

            populateFields();
        }
        else {
            // If something goes wrong, alert the error message that our service returned
            swal("Oops...", "Something went wrong!", "error");
        }
    });
}
/*
Email Signature Generator

@author: Ethan Lin
@url: https://github.com/oel-mediateam/uwextendedcampus-email-signature
@version: 1.0.0
@license: GNU GENERAL PUBLIC LICENSE v3

Email signature generator for UW Extended Campus
Copyright (C) 2019  Ethan Lin and UW Extended Campus

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

$( document ).ready( function() {
    
    let signatureComponents = {
        "firstName": "",
        "middleInitial": "",
        "lastName": "",
        "credential": "",
        "firstTitle": "",
        "secondTitle": "",
        "firstUnitProgram": "",
        "firstProgramWebsite": "",
        "secondUnitProgram": "",
        "secondProgramWebsite": "",
        "phoneNumber": "",
        "email": "",
        "valid": false
    };
    
    // enable phone number formatting
    $( "#phoneInput" ).inputmask({"mask": "(999) 999-9999"});
    
    /* on form input changes */
    
    // first name
    $( "#firstNameInput" ).on( "focus", function() {
        
        $( "#firstName" ).addClass( "mark" );
        
    } );
    
    $( "#firstNameInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.firstName = titleCase( value );
        this.value = signatureComponents.firstName;
        
        $( "#firstName" ).html( signatureComponents.firstName ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            $( "#firstName" ).addClass( "text-muted" ).removeClass( "mark" ).html( "First Name" );
        }
        
    } );
    
    // middle initial
    $( "#mInitialInput" ).on( "focus", function() {
        
        $( "#middleInitial" ).removeClass( "d-none" ).addClass( "mark" );
        
    } );

    $( "#mInitialInput" ).on( "blur", function() {
        
        let value = this.value.replace(".", "").trim();
        let newValue = "";
        
        if ( value.length >= this.maxLength ) {
            value = value[0] + value[1];
        }
        
        if ( value.length ) {
            [...value].forEach( c => c != "." ? newValue += c + "." : newValue += "" );
        } else {
            newValue = value;
        }
        
        signatureComponents.middleInitial = newValue.toUpperCase();
        
        this.value = signatureComponents.middleInitial;
        $( "#middleInitial" ).html( signatureComponents.middleInitial ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            $( "#middleInitial" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "Middle Initial" );
        }
        
    } );
    
    // last name
    $( "#lastNameInput" ).on( "focus", function() {
        
        $( "#lastName" ).addClass( "mark" );
        
    } );
    
    $( "#lastNameInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.lastName = titleCase( value );
        this.value = signatureComponents.lastName;
        
        $( "#lastName" ).html( signatureComponents.lastName ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            $( "#lastName" ).addClass( "text-muted" ).removeClass( "mark" ).html( "Last Name" );
        }
        
    } );
    
    // credential
    $( "#credentialInput" ).on( "focus", function() {
        
        $( "#credential" ).removeClass( "d-none" ).addClass( "mark" );
        
    } );
    
    $( "#credentialInput" ).on( "blur", function() {
        
        signatureComponents.credential = this.value.trim();
        
        $( "#credential" ).html( ", " + signatureComponents.credential ).removeClass( "text-muted mark" );
        
        if ( this.value.trim().length === 0 ) {
            this.value = "";
            $( "#credential" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( ", Credential" );
        }
        
    } );
    
    // 1st title
    $( "#titleInput" ).on( "focus", function() {
        
        $( "#title" ).addClass( "mark" );
        
    } );
    
    $( "#titleInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.firstTitle = titleCase( value );
        this.value = signatureComponents.firstTitle;
        
        $( "#title" ).html( signatureComponents.firstTitle ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            $( "#title" ).addClass( "text-muted" ).removeClass( "mark" ).html( "Title" );
        }
        
    } );
    
    // 2nd title
    $( "#titleOptionalInput" ).on( "focus", function() {
        
        $( "#titleOptional" ).removeClass( "d-none" ).addClass( "mark" )
        
    } );
    
    $( "#titleOptionalInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.secondTitle = titleCase( value );
        this.value = signatureComponents.secondTitle;
        
        $( "#titleOptional" ).html( signatureComponents.secondTitle + "<br>" ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            $( "#titleOptional" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "Second Title<br>" );
        }
        
    } );
    
    // 1st business unit or program
    $( "#businessUnitInput" ).on( "focus", function() {
        
        $( "#businessUnit" ).addClass( "mark" );
        
    } );
    
    $( "#businessUnitInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.firstUnitProgram = titleCase( value );
        this.value = signatureComponents.firstUnitProgram;
        
        $( "#businessUnit" ).html( signatureComponents.firstUnitProgram ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            $( "#businessUnit" ).addClass( "text-muted" ).removeClass( "mark" ).html( "Business Unit or Program" );
        }
        
    } );
    
    // 1st program website
    $( "#programWebsiteInput" ).on( "focus", function() {
        
        $( "#programWebsite" ).removeClass( "d-none" ).addClass( "mark" );
        
    } );
    
    $( "#programWebsiteInput" ).on( "blur", function() {
        
        let value = this.value.trim().toLowerCase();
        
        value = value.replace(/http(s)?:\/\//gi, "");
        signatureComponents.firstProgramWebsite = value;
        this.value = signatureComponents.firstProgramWebsite;
        
        $( "#programWebsite" ).html( "| " + signatureComponents.firstProgramWebsite ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            $( "#programWebsite" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "| Program Website" );
        }
        
    } );
    
    // 2nd business unit or program and program website
    $( "#businessUnitOptionalInput, #programWebsiteOptionalInput" ).on( "focus", function() {
        
        $( "#2ndBusinessUnit" ).removeClass( "d-none" );
        
        if ( this.id === "businessUnitOptionalInput" ) {
            
            $( "#businessUnitOptional" ).removeClass( "d-none" ).addClass( "mark" );
            
        }
        
        if ( this.id === "programWebsiteOptionalInput" ) {
            
            $( "#businessUnitOptional" ).removeClass( "d-none" );
            $( "#programWebsiteOptional" ).removeClass( "d-none" ).addClass( "mark" );
            
        }
        
    } );
    
    $( "#businessUnitOptionalInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.secondUnitProgram = titleCase( value );
        this.value = signatureComponents.secondUnitProgram;
        
        $( "#businessUnitOptional" ).html( signatureComponents.secondUnitProgram ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            
            this.value = "";
            $( "#businessUnitOptional" ).addClass( "text-muted" ).removeClass( "mark" ).html( "Second Business Unit or Program" );
            
            if ( signatureComponents.secondProgramWebsite.length == 0 ) {
                
                $( "#2ndBusinessUnit" ).addClass( "d-none" );
                $( "#businessUnitOptional" ).addClass( "d-none" );
                
            }
            
        }
        
    } );
    
    $( "#programWebsiteOptionalInput" ).on( "blur", function() {
        
        let value = this.value.trim().toLowerCase().replace(/http(s)?:\/\//gi, "");
        
        signatureComponents.secondProgramWebsite = value;
        this.value = signatureComponents.secondProgramWebsite;
        
        $( "#programWebsiteOptional" ).html( "| " + signatureComponents.secondProgramWebsite ).removeClass( "text-muted mark" );
        $( "#businessUnitOptionalInput" ).attr("required", true);
        
        if ( value.length === 0 ) {
            
            this.value = "";
            $( "#programWebsiteOptional" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "| Program Website" );
            
            if ( signatureComponents.secondUnitProgram.length == 0 ) {
                
                $( "#2ndBusinessUnit" ).addClass( "d-none" );
                $( "#businessUnitOptional" ).addClass( "d-none" )
                $( "#businessUnitOptionalInput" ).attr("required", false);
                
            }
            
        }
        
    } );
    
    // phone number
    $( "#phoneInput" ).on( "focus", function() {
        
        $( "#phoneOptional" ).removeClass( "d-none" ).addClass( "mark" );
        
    } );
    
    $( "#phoneInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.phoneNumber = value;
        this.value = signatureComponents.phoneNumber;
        
        $( "#phoneOptional" ).html( signatureComponents.phoneNumber + " |" ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            $( "#phoneOptional" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "(123) 456-7890 |" );
        }
        
    } );
    
    // email local-part
    $( "#emailInput" ).on( "focus", function() {
        
        $( "#email" ).addClass( "mark" );
        
    } );
    
    $( "#emailInput" ).on( "blur", function() {
        
        let value = this.value.trim().toLowerCase();
        
        signatureComponents.email = value + "@uwex.edu";
        this.value = value;
        
        $( "#email" ).html( signatureComponents.email ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            $( "#email" ).addClass( "text-muted" ).removeClass( "mark" ).html( "first.last@uwex.edu" );
        }
        
    } );
    
    // form validation on submit and get signature button click
    $( "#signatureForm.needs-validation" ).on( "submit", function( event ) {
        
        event.preventDefault();
        event.stopPropagation();
        
        signatureComponents.valid = this.checkValidity();
        $( this ).addClass( "was-validated" );
        
        //if ( signatureComponents.valid ) {
            
            getSignature();
            
        //}

    } );
    
    $( "#getSignatureBtn" ).on( "click", function( event ) {
        
        event.preventDefault();
        event.stopPropagation();
        
        $( "#submitBtn" ).click();
        
        return false;
        
    } );
    
    // get signature function
    function getSignature() {
        
        console.log(signatureComponents);
        
        copyToClipboard();
        
    }
    
    function copyToClipboard() {
        
        selectText("artboard");
        
        try {
            
            // Now that we've selected the anchor text, execute the copy command  
            var successful = document.execCommand('copy');  
            var msg = successful ? 'successful' : 'unsuccessful';  
            console.log('Copies');
            
        } catch(err) {
            
            console.log('Oops, unable to copy');
             
        }
        
        // Remove the selections - NOTE: Should use
        // removeRange(range) when it is supported  
        window.getSelection().removeAllRanges();
        
    }
    
    // clear button
    $( "#clearBtn" ).on( "click", function() {
        
        $( "input" ).not( "input[type=button], input[type=submit]" ).val( "" ).blur();
        $( "#signatureForm.needs-validation" ).removeClass( "was-validated" );
        
    } );
    
} );

function titleCase( str ) {
    
    let splitStr = str.toLowerCase().split( " " );
    let skipWords = ["of", "the"];
    
    for ( let i = 0; i < splitStr.length; i++ ) {
    
        if ( !skipWords.includes( splitStr[i] ) ) {
            
            splitStr[i] = splitStr[i].charAt( 0 ).toUpperCase() + splitStr[i].substring( 1 );
            
        }
           
    }
    
    return splitStr.join( " " );
    
}

function selectText( id ) {
    
    let sel, range;
    let el = document.getElementById(id);

    if ( window.getSelection && document.createRange ) { 
        
        sel = window.getSelection();
        
        range = document.createRange(); //range object
        range.selectNode( el ); //sets Range
        sel.removeAllRanges(); //remove all ranges from selection
        sel.addRange( range );
        
    }
    
}
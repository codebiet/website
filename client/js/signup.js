let programmingLanguages = [];
let webTechnologies = [];
let webFrameworks = [];
let dbms = [];
let operatingSystem = [];
let technologies = [];
let cloudHostingPlatforms = [];
let interest = {
    preference1:'',
    preference2:'',
    preference3:''
};

function setProgrammingLanguages(){
    document.querySelectorAll('.programmingLanguages select').forEach(input => {
        if(input.value){
            programmingLanguages.push({
                name:input.getAttribute('data-name'),
                level:input.value
            })
        }
    })
    document.querySelector('input[name=programmingLanguages]').value = JSON.stringify(programmingLanguages);
}
function setWebTechnologies(){
    document.querySelectorAll('.webTechnologies select').forEach(input => {
        if(input.value){
            webTechnologies.push({
                name:input.getAttribute('data-name'),
                level:input.value
            })
        }
    })
    document.querySelector('input[name=webTechnologies]').value = JSON.stringify(webTechnologies);
}
function setWebFrameworks(){
    document.querySelectorAll('.webFrameworks select').forEach(input => {
        if(input.value){
            webFrameworks.push({
                name:input.getAttribute('data-name'),
                level:input.value
            })
        }
    })
    document.querySelector('input[name=webFrameworks]').value = JSON.stringify(webFrameworks);
}
function setDbms(){
    document.querySelectorAll('.dbms select').forEach(input => {
        if(input.value){
            dbms.push({
                name:input.getAttribute('data-name'),
                level:input.value
            })
        }
    })
    document.querySelector('input[name=dbms]').value = JSON.stringify(dbms);
}
function setOperatingSystem(){
    document.querySelectorAll('.operatingSystem select').forEach(input => {
        if(input.value){
            operatingSystem.push({
                name:input.getAttribute('data-name'),
                level:input.value
            })
        }
    })
    document.querySelector('input[name=operatingSystem]').value = JSON.stringify(operatingSystem);
}
function setTechnologies(){
    document.querySelectorAll('.technologies select').forEach(input => {
        if(input.value){
            technologies.push({
                name:input.getAttribute('data-name'),
                level:input.value
            });
        }
    });
    document.querySelector('input[name=technologies]').value = JSON.stringify(technologies);
}
function setCloudHostingPlatforms(){
    document.querySelectorAll('.cloudHostingPlatforms input[type=checkbox]').forEach(input => {
        if(input.checked){
            cloudHostingPlatforms.push(input.getAttribute('data-name'));
        }
    })
    document.querySelector('input[name=cloudHostingPlatforms]').value = JSON.stringify(cloudHostingPlatforms);
}
function setInterest(){
    interest.preference1 = document.querySelector('.interest select[data-name=preference1]').value;
    interest.preference2 = document.querySelector('.interest select[data-name=preference2]').value;
    interest.preference3 = document.querySelector('.interest select[data-name=preference3]').value;
    document.querySelector('input[name=interest]').value = JSON.stringify(interest);
}
document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();
    setProgrammingLanguages();
    setWebTechnologies();
    setWebFrameworks();
    setDbms();
    setOperatingSystem();
    setTechnologies();
    setCloudHostingPlatforms();
    setInterest();
    document.querySelector('input[name=whatsAppPhoneNumber]').value = '91'+ document.querySelector('input[name=whatsAppPhoneNumber]').value;
    console.log(document.querySelector('input[name=whatsAppPhoneNumber]').value);
    document.querySelector('input[name=callingPhoneNumber]').value = '91'+ document.querySelector('input[name=callingPhoneNumber]').value;
    console.log(document.querySelector('input[name=callingPhoneNumber]').value);
    console.log(JSON.parse(document.querySelector('input[name=programmingLanguages]').value));
    console.log(JSON.parse(document.querySelector('input[name=webTechnologies]').value));
    console.log(JSON.parse(document.querySelector('input[name=webFrameworks]').value));
    console.log(JSON.parse(document.querySelector('input[name=dbms]').value));
    console.log(JSON.parse(document.querySelector('input[name=operatingSystem]').value));
    console.log(JSON.parse(document.querySelector('input[name=technologies]').value));
    console.log(JSON.parse(document.querySelector('input[name=cloudHostingPlatforms]').value.toString()));
    console.log(JSON.parse(document.querySelector('input[name=interest]').value));
    this.submit();
})
(function(VE){
function validateContact(contact){const errors={};if(!contact.name.trim())errors.name='Enter your full name.';if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email))errors.email='Enter a valid business email.';if(contact.phone.replace(/\D/g,'').length<7)errors.phone='Enter a valid mobile number.';return errors;}

VE.validateContact=validateContact;
})(window.VE=window.VE||{});


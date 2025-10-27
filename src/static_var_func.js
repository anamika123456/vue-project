export const static_var = {
	setCookie:(cname,cvalue,exdays)=>{
	  const d = new Date();
	  d.setTime(d.getTime() + (exdays*24*60*60*1000));
	  let expires = "expires=" + ((cvalue)?d.toUTCString():new Date());
	  document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=.finvasia.com";
	},
	getCookie:(cname)=>{
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i < ca.length; i++) {
		    let c = ca[i];
		    while (c.charAt(0) == ' ') {
		      	c = c.substring(1);
		    }
		    if (c.indexOf(name) == 0) {
		      	return c.substring(name.length, c.length);
		    }
		}
		return "";
	},
	checkName:(val)=>{
		if(val.includes('_')){
			return val.split('_').join(' ')
		}
		return val
	},
	filterToasts:(toasts) => {
	  // Keep track of existing types
	  const types = {};
	  return toasts.reduce((aggToasts, toast) => {
	    // Check if type was not seen before
	    if (!types[toast.type]) {
	      aggToasts.push(toast);
	      types[toast.type] = true;
	    }
	    return aggToasts;
	  }, []);
	}
}
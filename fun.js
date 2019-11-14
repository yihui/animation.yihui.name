var t
var n = 1
var i = 1

function getElem(obj) {
	return(document.getElementById(obj))
}

function displayImage() {
	var lblTime = document.getElementById("lbl")
	var tm = Math.round((parseFloat(lblTime.innerHTML))*1000)
	if (n > nmax) n = 1
//	if (n == nmax) tm = 1000 * Math.min(Math.exp(tm / 1000), tm / 1000 + 5)
	getElem("btnBegin").disabled = true
	getElem("btnStop").disabled = false
	getElem("btnFaster").disabled = (parseFloat(lblTime.innerHTML) <= 0)
	getElem("btnSlower").disabled = false
	for(i = 1; i <= nmax; i++){
		getElem("divPreload" + i).style.display = "none"
	}
	getElem("divPreload").style.display = "block"
	getElem("divPreload" + n).style.display = "block"
	getElem("lblImage").innerHTML = "Graph " + n + " of " + nmax 
	t = setTimeout("displayImage()", tm) //change every tm seconds
	n++
}
	
function stopImage() {
	clearTimeout(t)
	getElem("btnBegin").disabled = false
	getElem("btnStop").disabled = true
	getElem("btnFaster").disabled = true
	getElem("btnSlower").disabled = true
	n--
}
	
function fasterImage(step) {
	var lblTime = getElem("lbl")
	var pct = getElem("percent")
	lblTime.innerHTML = Math.round((parseFloat(lblTime.innerHTML) + step)*1000)/1000
	var tmp = parseFloat(lblTime.innerHTML)
	getElem("btnFaster").disabled = (tmp <= 0)
	if (tmp >=0 && tmp <= 10) {
		pct.style.width = 100 - Math.round((parseFloat(lblTime.innerHTML))*10) + "%"
		pct.innerHTML = pct.style.width
		pct.style.display = "block"
	}
	else pct.style.display = "none"
	if (tmp < 0) lblTime.innerHTML = "0"
}

window.onload = function(){
	if(getElem("btnBegin")){
		getElem("btnBegin").disabled = false
	}
	if(getElem("loading")) getElem("loading").style.display = "none"
	if(getElem("divDemo")) getElem("divDemo").style.height = ht + "px"
	fasterImage(0)
}

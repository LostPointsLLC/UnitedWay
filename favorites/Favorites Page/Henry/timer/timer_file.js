/*
Author: Robert Hashemian
http://www.hashemian.com/

You can use this code in any manner so long as the author's
name, Web address and this disclaimer is kept intact.
********************************************************
Usage Sample:

<script language="JavaScript">
PLT_DisplayFormat = "Your connection took %%S%% seconds to load the page.";
PLT_BackColor = "palegreen";
PLT_ForeColor = "navy";
PLT_FontPix = "16";
PLT_DisplayElementID = "display_here";
</script>
<script language="JavaScript" src="http://www.hashemian.com/js/PageLoadTime.js"></script>
*/

PLT_DisplayFormat = "Your connection took %%S%% seconds to load this page.";
PLT_BackColor = "palegreen";
PLT_ForeColor = "navy";
PLT_FontPix = "12";
PLT_DisplayElementID = "display_here";

if (typeof(PLT_BackColor)=="undefined")
  PLT_BackColor = "white";
if (typeof(PLT_ForeColor)=="undefined")
  PLT_ForeColor= "black";
if (typeof(PLT_DisplayFormat)=="undefined")
  PLT_DisplayFormat = "Your connection took %%S%% seconds to load the page.";
if (typeof(PLT_FontPix)=="undefined")
  PLT_FontPix = "16";
if (typeof(PLT_DisplayElementID)=="undefined")
  PLT_DisplayElementID = "";

dt=new Date();
document.onreadystatechange=function() {
  if (document.readyState=="complete") {
    if ((PLT_Span=document.getElementById(PLT_DisplayElementID)) == null) {
      document.body.insertBefore(document.createElement("br"));
      PLT_Span = document.body.insertBefore(document.createElement("span"));
    }
    PLT_DisplayFormat = PLT_DisplayFormat.replace(/%%S%%/g, ((new Date() - dt)/1000));
    PLT_Span.style.Color = PLT_ForeColor;
    PLT_Span.style.backgroundColor = PLT_BackColor;
    PLT_Span.style.fontSize = PLT_FontPix + "px";
    PLT_Span.innerText = PLT_DisplayFormat;
  }
}

<div id="label">
Camera position: <span class="labelValues">
<span id="CamX">0</span>
<span id="CamY">0</span>
<span id="CamZ">0</span>
</span><br />
Plane vertice count: <span class="labelValues">
<span id="PlaneVertices">0</span>
</span><br />
Curent segment: <span class="labelValues">
<span id="CurentSegment">0</span>
</span><br />
Left Top verticet: <span class="labelValues">
<span id="LeftVertice">0</span>
</span><br />
Mouse position: <span class="labelValues">
<span id="MousePos">0</span>
</span><br />
Angle: <span class="labelValues">
<span id="Angle">0</span>
</span><br />
Cube pos: <span class="labelValues">
<span id="CubePos">0</span>
</span><br />
Light pos: <span class="labelValues">
<span id="LightPos">0</span>
</span><br />

</div>
<div id="console">
<textarea name="message"  readonly="readonly" id="outputConsole">
</textarea><br>
<form onsubmit="event.preventDefault(); return ConsoleCommands()" name="inputConsole" autocomplete="off">
<input type="text" name="command" id="inputConsole">
</form>
</div>




<div id="editor">
<input type="checkbox" name="editor" value="true" onchange="editor.enable()" id="editorEnable">
Editor sphera size:<br />
<input type="range" name="editorSize" id="editorSize" onchange="editor.update()"  value="0" min="0" max="100">
</div>


# AngularJs-input-dropdown-list
<h3>The purpose of this directive is to have a drop-down list that can be filtered by writing text into it.</h4>

<h4>It requires only AngularJs and the files in "inputDropdownListDirective" folder to be included in your page.</h4>
<h4>For an example of usage download the repository and open "index.html" on a server.</h4>

This directive has 5 attributes:
<ul>
	<li><strong>options-array</strong> - an array to populate the drop-down list. The array can have as elements strings or objects that have string type properties.
	</li>
	<li><strong>property-name</strong> - the name of a property of an object in the options-array.
	This attribute has to be used when the options-array has objects as elements.
	If the options-array has primitives as elements then you must not use this attribute.<br/>
	This attribute has to be used when the options-array has objects as elements.<br/>
	If the options-array has strings as elements then you must not use this attribute.
	</li>
	<li><strong>bound-variable</strong> - a variable that is bound to the text in the input drop-down list.</li>
	<li><strong>on-text-changed</strong> - a function to call when text in the input is changed. The function passed to this attribute must have a value parameter, like this: <code>on-text-changed="yourFunction(value)"</code></li>
	<li><strong>on-option-selected</strong> - a function to call when an option is selected. The function passed to this attribute must have a value parameter, like this: <code>on-option-changed="yourFunction(value)"</code></li>
</ul>

<p>The drop-down list appears when it is <em>focused</em> or it is <em>clicked</em>. Note that only those options will show that contain the text in the input field.</p>
<p>When text is typed in, the list of options in the drop-down list is filtered, showing only the options that contain the text typed in.</p>
<p>When focus is lost or it is clicked again, the drop-down list closes.</p>

<p>The user can navigate through the options using the up and down keyboard arrows and he can select one by pressing the enter key.</p>

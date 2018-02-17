# AngularJs-input-dropdown-list
The purpose of this directive is to have a drop-down list that can be filtered by writing text into an input field.

This element has 4 attributes:                    

options-array: an array to populate the drop-down list. The array can have as elements primitives or objects,	

property-name: the name of a property of an object in the options-array.
	This attribute has to be used when the options-array has objects as elements.
	If the options-array has primitives as elements then you must not use this attribute.

bound-variable: a variable that is bound to the text in the input drop-down list.

on-text-changed: a function to call when text in the input is changed

on-option-selected: a function to call when an option is selected.

The drop-down list shows when it receives focus or it is clicked. Note that only those options will show that contain the text
in the input field.
When text is typed, the list of options in the drop-down is filtered, showing only the options that contain the text typed in.
When focus is lost the drop-down list closes.

The user can navigate through the options using the up and down keyboard arrows and he can select one by pressing the enter key.

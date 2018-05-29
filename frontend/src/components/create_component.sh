mkdir $1;
cd $1;
echo import \'./$1.scss\'\;$'\n'$'\n'import $1 from \'./$1\'\;$'\n'$'\n'export default $1\; > index.js;
echo import React from \'react\'\;$'\n'$'\n'const $1 = \(\) =\> null\;$'\n'$'\n'export default $1\; > $1.js;
touch $1.scss;
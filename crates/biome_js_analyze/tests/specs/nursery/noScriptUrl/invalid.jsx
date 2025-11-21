/* should generate diagnostics */
location.href = "javascript:alert('hacked!')";

location.href = `javascript:alert('hacked!')`;

const Invalid1 = <a href="javascript:alert('hacked!')">Click me</a>;

const Invalid2 = <button onClick$="javascript:alert('hacked!')">ring</button>;

const Invalid3 = <Link to="javascript:alert('hacked!')" />;

const Invalid4 = <Foo bar="javascript:alert('hacked!')" />;

const link1 = "javascript:alert('hacked!')";
const Invalid5 = <a href={link1} />;

const link2 = "\tj\na\tv\na\ts\nc\tr\ni\tpt:alert('hacked!')";
const Invalid6 = <a href={link2} />;

const link3 = "javascrip" + "t:alert('hacked!')";
const Invalid7 = <a href={link3} />;

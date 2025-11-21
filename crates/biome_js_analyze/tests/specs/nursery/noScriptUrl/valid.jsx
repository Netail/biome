/* should not generate diagnostics */
const Valid1 = <a href="/some-page">Click me</a>;

const Valid2 = <button onClick$={() => alert('not hacked!')}>ring</button>;

const Valid3 = <Link to="https://example.com" />;

const Valid4 = <Foo bar="https://example.com" />;

const link = "https://example.com";
const Valid5 = <a href={link} />;

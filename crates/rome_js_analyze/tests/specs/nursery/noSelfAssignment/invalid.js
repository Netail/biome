a = a;
[a] = [a];
[a, b] = [a, b];
[a, ...b] = [a, ...b];
({a, b} = {a, b});
[[a], [b]] = [[a], [b]];
[{a}, {b}] = [{a}, {b}];
[{a}, [b]] = [{a}, [b]];
({a: b} = {a: b});
({'a': b} = {'a': b});
({a: b} = {'a': b});
({1: b} = {'1': b});
({1: b} = {1: b});
({['a']: b} = {a: b});
({1: b} = {[1]: b});
({a: {b}, c: [d]} = {a: {b}, c: [d]});
({a, b} = {a, ...x, b});
a.b = a.b;
a.#b = a.#b;
a.c.b = a.ZZ.b;
a[b] = a[b];
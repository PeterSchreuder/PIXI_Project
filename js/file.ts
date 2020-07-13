interface Person {
    name: string;
    age: number;
}

class Greeter {
    name: string;
    sayHello() {
        console.log("hello" + name);
    }
}

function sortByName(a: Person[]) {
    var result = a.slice(0);

    result.sort((x, y) => {
        return x.name.localeCompare(y.name);
    });
    return result;
}

sortByName([]);
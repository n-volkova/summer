let decl = function(num, expressions) {
    let result,
        count = num % 100

    if (count >= 5 && count <= 20) {
        result = expressions[2]
    } else {
        count = count % 10
        if (count == 1) {
            result = expressions[0]
        } else if (count >= 2 && count <= 4) {
            result = expressions[1]
        } else {
            result = expressions[2]
        }
    }
    return result
}

export default decl
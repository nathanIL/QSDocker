angular.module('qsdocker.filters', [])
    .filter('repoTagParse', function() {
        return function(input, type) {
            if (input.indexOf(':') > -1) {
                var sections = input.split(':');
                if (type === "tag") {
                    return sections[sections.length -1]
                } else if (type === "name") {
                    return sections[0]
                }  else {
                    return input
                }
            } else {
                return type === "tag" ? "latest" : input
            }
        }
    });
function FilesList(name, dim, precision) {
    this.fileName = name;
    this.dimension = dim;
}
 
// now we export the class, so other modules can create Cat objects
module.exports = {
    FilesList: FilesList
}
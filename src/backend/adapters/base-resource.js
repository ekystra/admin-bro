/* eslint class-methods-use-this: 0 */

const NotImplementedError = require('../utils/not-implemented-error')

/**
 * Representation of a ORM Resource in AdminBro. Visally resource is a list item in the sidebar.
 * Each resource has many records and many properties.
 *
 * Analogy is REST resource.
 *
 * @mermaid
 *   graph TD
 *   A[BaseDatabase] -->|has many| B(BaseResource)
 *   B --> |has many|C(BaseRecord)
 *   B --> |has many|D(BasePorperty)
 *
 */
class BaseResource {
  /**
   * Checks if given adapter supports resource provided by the user
   *
   * @param  {any}  rawResource resource provided in AdminBroOptions#resources array
   * @return {Boolean}          if given adapter supports this resource - returns true
   */
  static isAdapterFor(rawResource) {
    throw new NotImplementedError()
  }
  /**
   * The name of the database to which resource belongs. When resource is
   * a mongoose model it should be database name of the mongo database.
   *
   * Visuall, by default, all resources are nested in sidebar under their database names.
   * @return {String}         database name
   */
  databaseName() {
    throw new NotImplementedError()
  }

  
  /**
   * Returns type of the database. It is used to compute sidebar icon for
   * given resource
   * @return {String}
   */
  databaseType() {
    throw new NotImplementedError()
  }

  /**
   * Return name of the resource.
   * It could be a table name in SQL database, or collection name in mongoDB.
   *
   * Visually it will be shown as the name of the resource in the UI.
   * @return {String}
   */
  name() {
    throw new NotImplementedError()
  }


  /**
   * Each resource has to have uniq id which will be put to an URL of AdminBro routes.
   * For instance in {@link Router} path for the `new` form is `/resources/{resourceId}/new`
   * @return {String} uniq resource id
   */
  id() {
    throw new NotImplementedError()
  }

  /**
   * returns array of all properties which belongs to resource
   * @return {BaseProperty[]}
   */
  properties() {
    throw new NotImplementedError()
  }

  /**
   * returns property object for given field
   * @param {String} path           path/name of the property. Take a look at
   *                                {@link BaseProperty} to learn more about
   *                                property paths.
   * @return {BaseProperty}
   */
  property(path) {
    throw new NotImplementedError()
  }

  /**
   * Returns number of elements for given resource
   * @return {Number}
   */
  async count() {
    throw new NotImplementedError()
  }

  /**
   * Returns actual records for given resource
   *
   * @param  {Object} query           query
   * @param  {Object} options
   * @param  {Number} options.limit   how many records should be taken
   * @param  {Number} options.offset  offset
   * @param  {Number} options.sort    sort
   * @return {BaseRecord[]}           list of records
   */
  async find(query, { limit=20, offset=0, sort={} }) {
    throw new NotImplementedError()
  }

  /**
   * Finds one Record in the Resource by its id
   * @param  {String} id      uniq id of the Resource Record
   * @return {BaseRecord}   record
   */
  async findOne(id) {
    throw new NotImplementedError()
  }

  /**
   * Builds new Record of given Resource.
   *
   * Each Record is an representation of the resource item. Before it can be saved,
   * it has to be instantiated.
   *
   * @param  {Object} params
   * @return {BaseRecord}
   */
  async build(params) {
    throw new NotImplementedError()
  }

  /**
   * Creates new record
   * @param  {Object} params
   * @return {Object}                  created record converted to raw Object which
   *                                   can be used to initiate new {@link BaseRecord} instance
   * @throws {ValidationError} If there are validation errors it should be thrown
   */
  async create(params) {
    throw new NotImplementedError()
  }

  /**
   * Updates an object
   * @param  {String} id      uniq id of the Resource Record
   * @param  {Object} params
   * @return {Object}                  created record converted to raw Object which
   *                                   can be used to initiate new {@link BaseRecord} instance
   * @throws {ValidationError} If there are validation errors it should be thrown
   */
  async update(id, params) {
    throw new NotImplementedError()
  }

  /**
   * Delete given record by id
   * @param  {String|Number} id id of the Record
   */
  async delete(id) {
    throw new NotImplementedError()
  }

  /**
   * Assigns given decorator to the Resource. Than it will be available under
   * resource.decorate() method
   * @param  {BaseDecorator}  Decorator
   * @param  {AdminBro}       admin         current instance of AdminBro
   */
  assignDecorator(Decorator, admin) {
    this._Decorator = Decorator
    this._decorated = new Decorator({ resource: this, admin: admin })
  }

  /**
   * Gets decorator object for given resource
   * @return {BaseDecorator | null}
   */
  decorate() {
    return this._decorated
  }
}

module.exports = BaseResource

/**
 *  分页信息
 *  @author Sawyer
 */
export class PageInfo<T> {

  /**
   * 总数
   */
  private _total = 0;
  /**
   * 每页显示条数，默认 10
   */
  private _size = 10;
  /**
   * 当前页
   */
  private _current = 1;

  private _records?: Array<T>;

  public constructor(size: number = 10) {
    this._size = size;
  }

  public get total(): number {
    return this._total;
  }

  public set total(total: number) {
    this._total = total;
  }

  public get size(): number {
    return this._size;
  }

  public set size(size: number) {
    this._size = size;
  }

  public get current(): number {
    return this._current;
  }

  public set current(current: number) {
    this._current = current;
  }

  /**
   * 当前分页总页数
   */
  public get pages(): number {
    if (this.size === 0) {
      return 0;
    }

    let pages = this.total / this.size;
    if (this.total % this.size !== 0) {
      pages++;
    }
    return pages;
  }


  /**
   * 是否存在上一页
   * @returns true or false
   */
  public get hasPrevious(): boolean {
    return this.current > 1;
  }

  /**
   * 是否存在下一页
   *
   * @return true / false
   */
  public get hasNext(): boolean {
    return this.current < this.pages;
  }

  public get records(): Array<T> {
    return this._records;
  }

  public set records(records: Array<T>) {
    this._records = records;
  }

}
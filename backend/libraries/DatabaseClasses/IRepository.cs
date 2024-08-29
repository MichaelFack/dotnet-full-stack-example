using System.Linq.Expressions;

namespace Fack.Libraries.DatabaseClasses;

public interface IRepository<TEntity>
  where TEntity : BaseEntity
{
  public TEntity Get(int id);
  public List<TEntity> Get(
    Expression<Func<TEntity, bool>> filter);
  public List<TEntity> Get(
    Expression<Func<TEntity, bool>> filter,
    Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy);
  public void Add(TEntity entity);
  public void Remove(TEntity entity);
}
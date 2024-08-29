using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Fack.Libraries.DatabaseClasses;

public class Repository<TEntity, TContext>(TContext context) : IRepository<TEntity>
  where TEntity : BaseEntity
  where TContext : DbContext
{
  private DbSet<TEntity> Entities { get; } = context.Set<TEntity>();

  public TEntity Get(int id)
  {
    return Entities.First(e => e.Id == id);
  }

  public List<TEntity> Get(Expression<Func<TEntity, bool>> filter)
  {
    return Entities.Where(filter).ToList();
  }

  public List<TEntity> Get(Expression<Func<TEntity, bool>> filter, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy)
  {
    return orderBy(Entities.Where(filter)).ToList();
  }

  public void Add(TEntity entity)
  {
    Entities.Add(entity);
  }

  public void Remove(TEntity entity)
  {
    Entities.Remove(entity);
  }
}
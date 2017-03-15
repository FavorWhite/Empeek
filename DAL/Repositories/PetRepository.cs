using DAL.Entities;
using DAL.Intefaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class PetRepository : IRepository<Pet>
    {
        private MyDbContext db;

        public PetRepository(MyDbContext context)
        {
            this.db = context;
        }

        public IEnumerable<Pet> GetAll()
        {
            return db.Pets;
        }

        public Pet Get(int id)
        {
            return db.Pets.Find(id);
        }

        public void Create(Pet pet)
        {
            db.Pets.Add(pet);
        }

        public void Update(Pet pet)
        {
            db.Entry(pet).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Pet pet = db.Pets.Find(id);
            if (pet != null)
                db.Pets.Remove(pet);
        }
    }
}

﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class Pet
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }


        public int UserId { get; set; }
        public User User { get; set; }
    }
}

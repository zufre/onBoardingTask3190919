using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using efTest3190919.Models;


namespace efTest3190919.Controllers
{
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
        private OnboardingProjectEntities db = new OnboardingProjectEntities();

       /* // GET: Customers
        public ActionResult Index()
        {
            
          return View(db.Customers.ToList());
        }*/
        // GET: Customers/GetCustomers
        public JsonResult GetCustomers()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var data = db.Customers.ToList();
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        
        
        [HttpPost]
       
         public JsonResult Create(Customer customer)
         {

             Customer cust = new Customer();
             cust.Name = customer.Name;
             cust.Address = customer.Address;
           
             db.Customers.Add(cust);
             db.SaveChanges();
             return Json(customer, JsonRequestBehavior.AllowGet);
         }




        // GET: Customers/Edit/5
        /* public ActionResult Edit(int? id)
         {
             if (id == null)
             {
                 return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
             }
             Customer customer = db.Customers.Find(id);
             if (customer == null)
             {
                 return HttpNotFound();
             }
             return View(customer);
         }*/

        // POST: Customers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.

        /* public JsonResult Edit([BindCustomer customer)
         {

             Customer cust = new Customer();
             cust.Name = customer.Name;
             cust.Address = customer.Address;

             db.Customers.Add(cust);
             db.SaveChanges();
             return Json(customer, JsonRequestBehavior.AllowGet);
         }*/
        [HttpPost]
        public ActionResult Edit([Bind(Include = "Id,Name,Address")] Customer customer)
        {


            var cust = db.Customers.Find(customer.Id);

            cust.Name = customer.Name;
            cust.Address = customer.Address;
            db.SaveChanges();
            return Json(customer, JsonRequestBehavior.AllowGet);


        }

        // GET: Customers/Delete/5
        /*   public ActionResult Delete(int? id)
           {
               if (id == null)
               {
                   return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
               }
               Customer customer = db.Customers.Find(id);
               if (customer == null)
               {
                   return HttpNotFound();
               }
               return View(customer);
           }*/

        // POST: Customers/Delete/5
        
        [HttpPost, ActionName("Delete")]
       /* [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Customer customer = db.Customers.Find(id);
            db.Customers.Remove(customer);
            db.SaveChanges();
            return RedirectToAction("Index");
        }*/
        // POST: Customers/Delete/5
      /*  public JsonResult DeleteConfirmed(int id )
        {

            Customer cust = db.Customers.Find(id);
            db.Customers.Remove(cust);
            db.SaveChanges();
           
            return Json(cust, JsonRequestBehavior.AllowGet);
        }*/
       
        public ActionResult DeleteConfirmed(int id)
        {
            Customer cust = db.Customers.Find(id);
            db.Customers.Remove(cust);
            db.SaveChanges();
            return Json(cust, JsonRequestBehavior.AllowGet);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

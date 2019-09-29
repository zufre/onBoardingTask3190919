using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using efTest3190919.Models;

namespace efTest3190919.Controllers
{
    [Route("api/[controller]")]
    public class SalesController : Controller
    {
        private OnboardingProjectEntities db = new OnboardingProjectEntities();
        /*
                // GET: Sales
                public ActionResult Index()
                {
                    var sales = db.Sales.Include(s => s.Customer).Include(s => s.Product).Include(s => s.Store);
                    return View(sales.ToList());
                }
        */
        public JsonResult GetSales()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var data = db.Sales.ToList();
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


        /*  // GET: Sales/Create
          public ActionResult Create()
          {
              ViewBag.CustomerId = new SelectList(db.Customers, "Id", "Name");
              ViewBag.ProductId = new SelectList(db.Products, "Id", "Name");
              ViewBag.StoreId = new SelectList(db.Stores, "Id", "Name");
              return View();
          }*/

        [HttpPost]

        public JsonResult Create(Sale sale)
        {

            Sale sl = new Sale();
            sl.CustomerId = sale.CustomerId;
            sl.ProductId = sale.ProductId;
            sl.StoreId = sale.StoreId;
            sl.DateSold = sale.DateSold;
            db.Sales.Add(sl);
            db.SaveChanges();
            return Json(sale, JsonRequestBehavior.AllowGet);
        }

        // POST: Sales/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
      /*  [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,ProductId,CustomerId,StoreId,DateSold")] Sale sale)
        {
            if (ModelState.IsValid)
            {
                db.Sales.Add(sale);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CustomerId = new SelectList(db.Customers, "Id", "Name", sale.CustomerId);
            ViewBag.ProductId = new SelectList(db.Products, "Id", "Name", sale.ProductId);
            ViewBag.StoreId = new SelectList(db.Stores, "Id", "Name", sale.StoreId);
            return View(sale);
        }*/

        // GET: Sales/Edit/5
       /* public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sale sale = db.Sales.Find(id);
            if (sale == null)
            {
                return HttpNotFound();
            }
            ViewBag.CustomerId = new SelectList(db.Customers, "Id", "Name", sale.CustomerId);
            ViewBag.ProductId = new SelectList(db.Products, "Id", "Name", sale.ProductId);
            ViewBag.StoreId = new SelectList(db.Stores, "Id", "Name", sale.StoreId);
            return View(sale);
        }*/

        // POST: Sales/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        /*[HttpPost]
       
        public ActionResult Edit([Bind(Include = "Id,ProductId,CustomerId,StoreId,DateSold")] Sale sale)
        {
            if (ModelState.IsValid)
            {
                db.Entry(sale).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CustomerId = new SelectList(db.Customers, "Id", "Name", sale.CustomerId);
            ViewBag.ProductId = new SelectList(db.Products, "Id", "Name", sale.ProductId);
            ViewBag.StoreId = new SelectList(db.Stores, "Id", "Name", sale.StoreId);
            return View(sale);
        }*/
        [HttpPost]
        public ActionResult Edit([Bind(Include = "Id, ProductId, CustomerId, StoreId, DateSold")] Sale sale)
        {


            var sl = db.Sales.Find(sale.Id);

            sl.CustomerId = sale.CustomerId;
            sl.ProductId = sale.ProductId;
            sl.StoreId = sale.StoreId;
            sl.DateSold = sale.DateSold;
            db.SaveChanges();
            return Json(sale, JsonRequestBehavior.AllowGet);


        }
        // GET: Sales/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sale sale = db.Sales.Find(id);
            if (sale == null)
            {
                return HttpNotFound();
            }
            return View(sale);
        }

        // POST: Sales/Delete/5
      /*  [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Sale sale = db.Sales.Find(id);
            db.Sales.Remove(sale);
            db.SaveChanges();
            return RedirectToAction("Index");
        }*/
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Sale sl = db.Sales.Find(id);
            db.Sales.Remove(sl);
            db.SaveChanges();
            return Json(sl, JsonRequestBehavior.AllowGet);
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

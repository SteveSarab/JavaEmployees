//employee.java
public abstract class employee {
	private String firstname;
	private String lastname;
	private String socialsecnum;
	
	public employee(String first, String last, String ssn)
	{
		firstname = first;
		lastname = last;
		socialsecnum = ssn;
	}
	
	public void setfirstname(String first)
	{
		firstname = first;
	}
	
	public String getfirstname()
	{
		return firstname;
	}
	
	public void setlastname(String last)
	{
		lastname = last;
	}
	
	public String getlastname()
	{
		return lastname;
	}
	
	public void setsocial(String ssn)
	{
		socialsecnum = ssn;
	}
	
	public String getsocial()
	{
		return socialsecnum;
	}
	
	@Override
	public String toString()
	{
		return String.format( "%s %s\nsocial security number: %s", getfirstname(), getlastname(), getsocial());
	}
	
	public abstract double earnings();
}


//empsalary.java
public class empsalary extends employee {
	private double weekSalary;
	
	public empsalary(String first, String last, String ssn, double salary)
	{
		super(first, last, ssn);
		setweekSalary(salary);
	}
	
	public void setweekSalary(double salary)
	{
		@SuppressWarnings("unused")
		double baseSalary;
		if (salary >= 0.0)
			baseSalary = salary;
		else
			throw new IllegalArgumentException("The weekly salary needs to be >= 0.0");
	}
	
	public double getweekSalary()
	{
		return weekSalary;
	}
	
	@Override
	public double earnings()
	{
		return getweekSalary();
	}
	
	@Override
	public String toString()
	{
		return String.format("employee salary: %s\n%s: $%,.2f", super.toString(), "weekly salary", getweekSalary() );
	}
}


//houremployee.java
public class houremployee extends employee
{
   private double wage;
   private double hours;
    
   public houremployee(String first, String last, String ssn, double hourlyWage, double hoursWorked)
   {
      super(first, last, ssn);
      setWage(hourlyWage);
      setHours(hoursWorked);
   }

   public void setWage(double hourlyWage)
   {
      if (hourlyWage >= 0.0)
         wage = hourlyWage;
      else
         throw new IllegalArgumentException("Hourly wage must be >= 0.0" );
   }

   public double getWage()
   {
      return wage;
   }

   public void setHours( double hoursWorked )
   {
      if ((hoursWorked >= 0.0) && (hoursWorked <= 168.0))
         hours = hoursWorked;
      else
         throw new IllegalArgumentException("Hours worked must be >= 0.0 and <= 168.0");
   }

   public double getHours()
   {
      return hours;
   }

   @Override                                                           
   public double earnings()                                            
   {                                                                  
   if (getHours() <= 40) // no overtime
      return getWage() * getHours();                                
   else                                                             
      return 40 * getWage() + (getHours() -  40) * getWage() *  1.5 ;
   }                                            
              
   @Override                                                             
   public String toString()                                              
   {                                                                     
      return String.format("hourly employee: %s\n%s: $%,.2f; %s: %,.2f", super.toString(), "hourly wage", getWage(), "hours worked", getHours());
   }                                              
}


//commissionemployee.java
public class commissionemployee extends employee
{
   private double grossSales;
   private double commissionRate;

   public commissionemployee( String first, String last, String ssn, double sales, double rate )
   {
      super(first, last, ssn);
      setGrossSales(sales);
      setCommissionRate(rate);
   }

   public void setCommissionRate(double rate)
   {
      if (rate > 0.0 && rate < 1.0)
         commissionRate = rate;
      else
         throw new IllegalArgumentException("Commission rate must be > 0.0 and < 1.0");
   }

   public double getCommissionRate()
   {
      return commissionRate;
   }

   public void setGrossSales(double sales)
   {
      if (sales >= 0.0)
         grossSales = sales;
      else
         throw new IllegalArgumentException("Gross sales must be >= 0.0");
   }

   public double getGrossSales()
   {
      return grossSales;
   }

   @Override                                                           
   public double earnings()                                            
   {                                                                   
      return getCommissionRate() * getGrossSales();                    
   }                                            

   @Override                                                   
   public String toString()                                    
   {                                    
   return String.format( "%s: %s\n%s: $%,.2f; %s: %.2f",
         "commission employee", super.toString(),              
         "gross sales", getGrossSales(),                       
         "commission rate", getCommissionRate() );             
   }
}                                    


//baseplus.java
public class baseplus extends commissionemployee
{
   private double baseSalary;

   public baseplus(String first, String last, String ssn, double sales, double rate, double salary)
   {
      super(first, last, ssn, sales, rate);
      setBaseSalary(salary);
   }

   public void setBaseSalary(double salary)
   {
      if (salary >= 0.0)
         baseSalary = salary;
      else
         throw new IllegalArgumentException("Base salary must be >= 0.0");
   }

   public double getBaseSalary()
   {
      return baseSalary;
   }

   @Override                                                            
   public double earnings()                                             
   {                                                                    
      return getBaseSalary() + super.earnings();                        
   }                                            

   @Override                                                           
   public String toString()                                            
   {                                                                   
   return String.format( "%s %s; %s: $%,.2f",
         "base-salaried", super.toString(), "base salary", getBaseSalary());                             
   }                                           
}


//payrolltest.java
public class payrolltest {
	public static void main( String[] args )
      {                                         
         empsalary salariedEmployee =                                 
         new empsalary(  "John",  "Smith" ,  "111-11-1111", 800.00 );
         houremployee hourlyEmployee =                                     
         new houremployee( "Karen", "Price" ,  "222-22-2222", 16.75, 40 );
         commissionemployee commissionEmployee =                             
         new commissionemployee(                                          
         "Sue",  "Jones", "333-33-3333", 10000, .06 );
         baseplus basePlusCommissionEmployee =             
         new baseplus(                                  
            "Bob", "Lewis", "444-44-4444", 5000, .04, 300 );                 

         System.out.println( "Employees processed individually:\n" );

         System.out.printf( "%s\n%s: $%,.2f\n\n",
            salariedEmployee, "earned", salariedEmployee.earnings() );
         System.out.printf( "%s\n%s: $%,.2f\n\n",
            hourlyEmployee, "earned", hourlyEmployee.earnings() );
         System.out.printf( "%s\n%s: $%,.2f\n\n",
            commissionEmployee, "earned", commissionEmployee.earnings() );
         System.out.printf( "%s\n%s: $%,.2f\n\n",
            basePlusCommissionEmployee,
            "earned", basePlusCommissionEmployee.earnings() );

         employee[] employees = new employee[  4 ];

         employees[0] = salariedEmployee;          
         employees[1] = hourlyEmployee;            
         employees[2] = commissionEmployee;        
         employees[3] = basePlusCommissionEmployee;

         System.out.println( "Employees processed polymorphically:\n" );

         for (employee currentEmployee : employees)
         {
            System.out.println(currentEmployee);

            if (currentEmployee instanceof baseplus)
            {
               baseplus employee =
                  (baseplus) currentEmployee;

               employee.setBaseSalary( 1.10 * employee.getBaseSalary() );

               System.out.printf(
                  "new base salary with 10%% increase is: $%,.2f\n",
                  employee.getBaseSalary() );
            }

            System.out.printf(
               "earned $%,.2f\n\n", currentEmployee.earnings() );
         }

         for ( int j = 0; j < employees.length; j++ )      
            System.out.printf(  "Employee %d is a %s\n", j,
               employees[ j ].getClass().getName() );      
      }
}
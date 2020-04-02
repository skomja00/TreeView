package model.list;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData {
    
    public String a = "";
    public String b = "";
    public String c = "";
    public String d = "";
    //public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            this.a = FormatUtils.formatString(results.getObject("a"));
            this.b = FormatUtils.formatString(results.getObject("b"));
            this.c = FormatUtils.formatString(results.getObject("c"));
            this.d = FormatUtils.formatString(results.getObject("d"));
        } catch (Exception e) {
            //this.errorMsg = "Exception thrown in model.beverages.StringData (the constructor that takes a ResultSet): " + e.getMessage();
            System.out.println("Exception thrown in model.list.StringData (the constructor that takes a ResultSet): " + e.getMessage());
        }
    }

    public int getCharacterCount() {
        String s = 
            this.a + 
            this.b + 
            this.c + 
            this.d;
        return s.length();
    }

    public String toString() {
        return
                "a : " + this.a  + 
                "b : " + this.b  + 
                "c : " + this.c  + 
                "d : " + this.d;
    }
}

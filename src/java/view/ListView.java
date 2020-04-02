package view;

import dbUtils.DbConn;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.list.StringData;
import model.list.StringDataList;

public class ListView {

    public static StringDataList listAPI(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "call list;"; /* call stored procedure named list to run sql select */
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            //sd.errorMsg = "Exception thrown in treeviewView: " + e.getMessage();
            System.out.println("Exception thrown in treeviewView: " + e.getMessage());
            sdl.add(sd);
        }
        return sdl;
    }
}
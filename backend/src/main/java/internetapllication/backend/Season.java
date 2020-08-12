package internetapllication.backend;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Season {
	private Integer Id;
	private Integer Year;
	private Integer Ast;
	private Integer Pts;
	private Integer G;
	
	private String Player;
	private String Pos;
	private String Tm;
	private String P3_Per;

	public Season(Integer id, Integer year, Integer ast, Integer pts, Integer g, String player, String pos, String tm,
			String p3_Per) {
		super();
		Id = id;
		Year = year;
		Ast = ast;
		Pts = pts;
		G = g;
		Player = player;
		Pos = pos;
		Tm = tm;
		P3_Per = p3_Per;
	}
	
	public Season() {
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	public Integer getId() {
		return Id;
	}
	public void setId(Integer id) {
		Id = id;
	}
	public Integer getYear() {
		return Year;
	}
	public void setYear(Integer year) {
		Year = year;
	}
	public Integer getAst() {
		return Ast;
	}
	public void setAst(Integer ast) {
		Ast = ast;
	}
	public Integer getPts() {
		return Pts;
	}
	public void setPts(Integer pts) {
		Pts = pts;
	}
	public Integer getG() {
		return G;
	}
	public void setG(Integer g) {
		G = g;
	}
	public String getPlayer() {
		return Player;
	}
	public void setPlayer(String player) {
		Player = player;
	}
	public String getPos() {
		return Pos;
	}
	public void setPos(String pos) {
		Pos = pos;
	}
	public String getTm() {
		return Tm;
	}
	public void setTm(String tm) {
		Tm = tm;
	}
	public String getP3_Per() {
		return P3_Per;
	}
	public void setP3_Per(String p3_Per) {
		P3_Per = p3_Per;
	}
	
}

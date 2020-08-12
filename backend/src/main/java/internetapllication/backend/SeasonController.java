package internetapllication.backend;


import java.util.List;
import java.lang.Integer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SeasonController {
	
	@Autowired
	private SeasonService service;
	
		
	@GetMapping({"/NBA/{year}/{pos}/{index}/{limit}","/NBA///{index}/{limit}"})
	public ResponseEntity<List<Season>> findby(@PathVariable Integer year,@PathVariable String pos,@PathVariable String index,@PathVariable Integer limit) {
		Pageable page = PageRequest.of(0, limit,Sort.by(index).descending());
		switch(pos) {
		case "PF":
			return new ResponseEntity<List<Season>>(service.findByPFService(year, page),HttpStatus.OK);
		case "PG":
			return new ResponseEntity<List<Season>>(service.findByPGService(year, page),HttpStatus.OK);
		case "C":
			return new ResponseEntity<List<Season>>(service.findByCService(year, page),HttpStatus.OK);
		case "F":
			return new ResponseEntity<List<Season>>(service.findByPFService(year, page),HttpStatus.OK);
		case "SG":
			return new ResponseEntity<List<Season>>(service.findBySGService(year, page),HttpStatus.OK);
		default:
			return new ResponseEntity<List<Season>>(service.findAllService(year, page),HttpStatus.OK);
		}
	}
}

package internetapllication.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class SeasonService {
	
	@Autowired
	private SeasonRepository repo;
	
	public List<Season> findByPFService(Integer year, Pageable page){
		return repo.findByPF(year, page);
	}
	
	public List<Season> findByPGService(Integer year, Pageable page){
		return repo.findByPG(year, page);
	}
	
	public List<Season> findByFService(Integer year, Pageable page){
		return repo.findByF(year, page);
	}
	
	public List<Season> findByCService(Integer year, Pageable page){
		return repo.findByC(year, page);
	}
	
	public List<Season> findBySGService(Integer year, Pageable page){
		return repo.findBySG(year, page);
	}
	
	
	public List<Season> findAllService(Integer year, Pageable page){
		return repo.findAll(year, page);
	}
}

	
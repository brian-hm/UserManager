package com.brian.userManager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.brian.userManager.exceptions.DataIntegrityException;
import com.brian.userManager.exceptions.ObjectNotFoundException;
import com.brian.userManager.model.Cargo;
import com.brian.userManager.repository.CargoRepository;

@Service
public class CargoService {
	
	@Autowired
	private CargoRepository repository;
	
	public Cargo criar(Cargo obj) {
		try {
			return repository.save(obj);
		}catch(DataIntegrityViolationException e){
			throw new DataIntegrityException("Cargo já cadastrado!");
		}
		
	}
	
	public Cargo editar(Cargo obj) {
		Cargo cargo = findById(obj.getId());
		updateData(cargo, obj);
		
		try {
			return repository.save(obj);
		}catch(DataIntegrityViolationException e){
			throw new DataIntegrityException("Cargo já cadastrado!");
		}
	}
	
	public Cargo findById(Integer id) {
		Optional<Cargo> obj = repository.findById(id);
		return obj.orElseThrow(()-> new ObjectNotFoundException("Objeto não encontrado! ID: " + id + ", tipo: " + Cargo.class.getName()));
	}
	
	private void updateData(Cargo newObj, Cargo obj) {
		newObj.setNome(obj.getNome());
	}
	
	public List<Cargo> findAll(){
		List<Cargo> list = repository.findAll(Sort.by("nome"));
		return list;
 	}
	
	
}

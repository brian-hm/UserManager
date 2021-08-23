package com.brian.userManager.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.brian.userManager.model.Cargo;
import com.brian.userManager.service.CargoService;

@RestController
@RequestMapping("/cargo")
public class CargoController {
	@Autowired
	private CargoService service;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Cargo> criar(@Valid @RequestBody Cargo obj){
		Cargo cargo = service.criar(obj);
		return ResponseEntity.ok().body(cargo);
	}
	
	@RequestMapping(value = "/{id}",method=RequestMethod.GET)
	public ResponseEntity<Cargo> findById(@PathVariable Integer id){
		Cargo cargo = service.findById(id);
		return ResponseEntity.ok().body(cargo);
	}
	
	@RequestMapping(value = "/{id}",method=RequestMethod.PUT)
	public ResponseEntity<Cargo> editar(@Valid @RequestBody Cargo obj,@PathVariable Integer id){
		obj.setId(id);
		Cargo cargo = service.editar(obj);
		return ResponseEntity.ok().body(cargo);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Cargo>> findAll(){
		List<Cargo> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
}

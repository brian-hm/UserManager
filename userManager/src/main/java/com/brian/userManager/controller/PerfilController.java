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

import com.brian.userManager.model.Perfil;
import com.brian.userManager.service.PerfilService;

@RestController
@RequestMapping("/perfil")
public class PerfilController {
	@Autowired
	private PerfilService service;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Perfil> criar(@Valid @RequestBody Perfil obj){
		Perfil perfil = service.criar(obj);
		return ResponseEntity.ok().body(perfil);
	}
	
	@RequestMapping(value = "/{id}",method=RequestMethod.GET)
	public ResponseEntity<Perfil> findById(@PathVariable Integer id){
		Perfil perfil = service.findById(id);
		return ResponseEntity.ok().body(perfil);
	}
	
	@RequestMapping(value = "/{id}",method=RequestMethod.PUT)
	public ResponseEntity<Perfil> editar(@Valid @RequestBody Perfil obj,@PathVariable Integer id){
		obj.setId(id);
		Perfil perfil = service.editar(obj);
		return ResponseEntity.ok().body(perfil);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Perfil>> findAll(){
		List<Perfil> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@RequestMapping(value = "/{id}",method=RequestMethod.DELETE)
	public void deletar(@PathVariable Integer id) {	
		service.deletar(id);
	}
	
}

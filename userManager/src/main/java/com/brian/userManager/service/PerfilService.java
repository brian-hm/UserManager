package com.brian.userManager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.brian.userManager.exceptions.DataIntegrityException;
import com.brian.userManager.exceptions.ObjectNotFoundException;
import com.brian.userManager.model.Perfil;
import com.brian.userManager.repository.PerfilRepository;

@Service
public class PerfilService {
	@Autowired
	private PerfilRepository repository;
	
	public Perfil criar(Perfil obj) {
		try {
			return repository.save(obj);
		}catch(DataIntegrityViolationException e) {
			throw new DataIntegrityException("Perfil já cadastrado!");
		}
	}
	
	public Perfil findById(Integer id) {
		Optional<Perfil> obj = repository.findById(id);
		return obj.orElseThrow(()-> new ObjectNotFoundException("Objeto não encontrado! ID: " + id + ", tipo: " + Perfil.class.getName()));
	}
	
	private void updateData(Perfil newObj, Perfil obj) {
		newObj.setNome(obj.getNome());
	}
	
	public Perfil editar(Perfil obj) {
		Perfil perfil = findById(obj.getId());
		updateData(perfil, obj);
		try {
			return repository.save(obj);
		}catch(DataIntegrityViolationException e){
			throw new DataIntegrityException("Perfil já cadastrado!");
		}
		
	}
	
	public List<Perfil> findAll() {
		List<Perfil> list = repository.findAll(Sort.by("nome"));		
		return list;
	}
	
	public void deletar(Integer id) {
		try {
			repository.deleteById(id);
		}catch(DataIntegrityViolationException e) {
			throw new DataIntegrityException("Perfil não pode ser excluido por estar vinculado a um ou mais usuários!");
		}
		
		
	}

}

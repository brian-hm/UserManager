package com.brian.userManager.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.brian.userManager.model.enums.Sexo;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonTypeName;

@Entity
@JsonTypeName("usuario")
public class Usuario extends Pessoa {
	private static final long serialVersionUID = 1L;
	@ManyToOne
	@JoinColumn(name = "cargo_id", referencedColumnName = "id")
	private Cargo cargo;
	@ManyToMany
    @JoinTable(name = "USUARIO_PERFIL",
    joinColumns = @JoinColumn(name = "usuario_id"),
    inverseJoinColumns = @JoinColumn(name = "perfil_id"))
	private List<Perfil> perfis;
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date dataCadastro;
	
	public Usuario() {}

	public Usuario(Integer id, String nome, String cpf, Date dataNascimento, Sexo sexo, Cargo cargo, List<Perfil> perfis) {
		super(id, nome, cpf, dataNascimento, sexo);
		this.cargo = cargo;
		this.perfis = perfis;
	}

	public Cargo getCargo() {
		return cargo;
	}

	public void setCargo(Cargo cargo) {
		this.cargo = cargo;
	}

	public List<Perfil> getPerfis() {
		return perfis;
	}

	public void setPerfis(List<Perfil> perfis) {
		this.perfis = perfis;
	}

	public Date getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(Date dataCadastro) {
		this.dataCadastro = dataCadastro;
	}
	
	
	
}

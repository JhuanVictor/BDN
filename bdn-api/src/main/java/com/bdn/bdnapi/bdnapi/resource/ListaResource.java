package com.bdn.bdnapi.bdnapi.resource;

import com.bdn.bdnapi.bdnapi.model.Item;
import com.bdn.bdnapi.bdnapi.model.Lista;
import com.bdn.bdnapi.bdnapi.repository.ItemRepository;
import com.bdn.bdnapi.bdnapi.repository.ListaRepository;
import com.bdn.bdnapi.bdnapi.service.ListaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/listas")
public class ListaResource{

    @Autowired
    private ListaRepository listaRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ListaService listaService;

    @GetMapping
    public List<Lista> buscarListas(){
        return listaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Lista> criarLista(@RequestBody Lista lista){
        Lista listaSalva = listaRepository.save(lista);
        return ResponseEntity.status(HttpStatus.CREATED).body(listaSalva);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Lista> atualizarLista(@PathVariable Long codigo, @RequestBody Lista lista){
        Lista listaSalva = listaService.atualizar(codigo, lista);
        return ResponseEntity.status(HttpStatus.OK).body(listaSalva);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarLista(@PathVariable Long codigo){
        listaRepository.deleteById(codigo);
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<List> buscarItensDaLista(@PathVariable Long codigo){
        List<Item> itensPesquisados = itemRepository.findAll();
        List<Item> result = new ArrayList<Item>();

        for (Item item: itensPesquisados){
            Lista lista = item.getLista();
            if(codigo == lista.getCodigo()){
                result.add(item);
            }
        }
        return !result.isEmpty()? ResponseEntity.ok(result) : ResponseEntity.noContent().build();
    }
}

package com.example.backend.Service.ClientService;

import com.example.backend.Entity.Client;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import com.example.backend.Payload.ClientDto;
import com.example.backend.Repository.ClientRepo;
import com.example.backend.Repository.CustomerCategoryRepo;
import com.example.backend.Repository.TerritoryRepo;
import com.example.backend.projection.ClientProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepo clientRepo;
    private final CustomerCategoryRepo customerCategoryRepo;
    private final TerritoryRepo territoryRepo;


    @Override
    public HttpEntity<?> getClients(List<UUID> city, List<Integer> customerCategory, Boolean active, Boolean tin, String search, Integer page, Integer size) {
        Pageable pageRequest = PageRequest.of(page == 0 ? 0 : page - 1, size);
        Page<ClientProjection> allByFilter = clientRepo.findClientsByFilters(tin, customerCategory, active, city, search, pageRequest);
        return ResponseEntity.ok(allByFilter);
    }

    @Override
    public HttpEntity<?> postCliet(ClientDto clientDto) {
        if (clientDto.isValid()) {
            CustomerCategory customerCategory = customerCategoryRepo.findById(clientDto.getCustomerCategoryId()).get();
            Territory territory = territoryRepo.findById(clientDto.getTerritoryId()).get();
            Client reqClient = new Client(UUID.randomUUID(), clientDto.getName(), clientDto.getAddress(), clientDto.getPhone(), clientDto.getTin(), clientDto.getCompanyName(), clientDto.getLongitude(), clientDto.getLatitude(), clientDto.getActive(), customerCategory, territory);
            Client newClient = clientRepo.save(reqClient);
            return ResponseEntity.ok(newClient);
        } else {
            return ResponseEntity.badRequest().body("Validation failed. " + clientDto.getValidationErrorMessage);
        }
    }

    @Override
    public void deleteClient(UUID id) {
        clientRepo.deleteById(id);
    }

    @Override
    public HttpEntity<?> putClient(ClientDto clientDto, UUID id) {
        Client editingClient = clientRepo.findById(id).get();
        editingClient.setName(clientDto.getName());
        editingClient.setAddress(clientDto.getAddress());
        editingClient.setPhone(clientDto.getPhone());
        editingClient.setTin(clientDto.getTin());
        editingClient.setCompanyName(clientDto.getCompanyName());
        editingClient.setLongitude(clientDto.getLongitude());
        editingClient.setLatitude(clientDto.getLatitude());
        editingClient.setCustomerCategory(customerCategoryRepo.findById(clientDto.getCustomerCategoryId()).get());
        editingClient.setTerritory(territoryRepo.findById(clientDto.getTerritoryId()).get());
        Client save = clientRepo.save(editingClient);
        return ResponseEntity.ok(save);
    }
}

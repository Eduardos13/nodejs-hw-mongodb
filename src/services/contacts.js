import { contactsModel } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = contactsModel.find();
  const contactsCount = await contactsModel.countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(contactsCount.perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await contactsModel.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactsModel.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const newResult = await contactsModel.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!newResult || !newResult.value) return null;

  return {
    contact: newResult.value,
    isNew: Boolean(newResult?.lastErrorObject?.upserted),
  };
};

export const deleteContactById = async (contactId) => {
  const contact = await contactsModel.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

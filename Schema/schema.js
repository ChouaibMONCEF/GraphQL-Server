const Company = require("../Models/company")
const Owner = require("../Models/owner")
const {
  GraphQLObjectType,
//   GraphQLInt,
//   GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
} = require("graphql")

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    owner: {
      type: OwnerType,
      resolve(parent, args) {
        console.log(parent)
        return Owner.findById(parent.id)
      },
    },
  }),
})

const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    companies: {
      type: GraphQLList(CompanyType),
      resolve(parent, args) {
        return Company.find({ owners: parent.id })
      },
    },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Company.findById(args.id)
      },
    },
    owner: {
      type: OwnerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Owner.findById(args.id)
      },
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve(parent, args) {
        return Company.find({})
      },
    },
    owners: {
      type: new GraphQLList(OwnerType),
      resolve(parent, args) {
        return Owner.find({})
      },
    },
  },
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addOwner: {
            type: OwnerType,
            args: {
                name: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                },
            },
            resolve(parent, args){
                let owner = new Owner({
                    name: args.name,
                    email: args.email
                });
                return owner.save()
            }
        },
        addCompany: {
            type: CompanyType,
            args: {
                name: {
                    type: GraphQLString
                },
                owners: {
                    type: GraphQLID
                },
            },
            resolve(parent, args){
                let company = new Company({
                    name: args.name,
                    owners: args.owners
                });
                return company.save()
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})